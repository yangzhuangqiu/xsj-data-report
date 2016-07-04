package com.xsj.data.report.service.impl;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.apache.commons.lang.StringUtils;
import org.apache.flume.Event;
import org.apache.flume.EventDeliveryException;
import org.apache.flume.FlumeException;
import org.apache.flume.api.RpcClient;
import org.apache.flume.api.RpcClientConfigurationConstants;
import org.apache.flume.api.RpcClientFactory;
import org.apache.flume.api.RpcClientFactory.ClientType;
import org.apache.flume.event.EventBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xsj.data.report.config.FlumeSinkConfig;
import com.xsj.data.report.domain.FlumeSinkData;
import com.xsj.data.report.service.FlumeSinkService;

@Service("flumeSinkService")
public class FlumeSinkServiceImpl implements FlumeSinkService{

	private final Logger log = LoggerFactory.getLogger(getClass());
	
	protected static final Charset UTF_8 = Charset.forName("UTF-8");
	
	@Autowired
	private FlumeSinkConfig flumeSinkConfig;
	
	private RpcClient rpcClient;
	
	@PostConstruct
	public void init(){
		try {
			if (null == rpcClient) {
				final Properties properties = getProperties(flumeSinkConfig);
				rpcClient = RpcClientFactory.getInstance(properties);
				log.info(">>>> flumeSinkService init success:rpcClient[{}]", rpcClient.getClass());
			}
		} catch (Exception e) {
			String errormsg = "RPC client creation failed! " + e.getMessage();
			throw new FlumeException(errormsg);
		}
	}
	
	@PreDestroy
	public void stop() {
		if (rpcClient != null) {
			try {
				rpcClient.close();
			} catch (FlumeException ex) {
				log.error("**** Error while trying to close RpcClient.", ex);
				throw ex;
			} finally {
				rpcClient = null;
			}
		} else {
			String errorMsg = "Flume sink already closed!";
			throw new FlumeException(errorMsg);
		}
	}
	private Properties getProperties(FlumeSinkConfig flumeSinkConfig)
			throws FlumeException {

		String hosts = flumeSinkConfig.getHosts();
		String selector = flumeSinkConfig.getSelector();
		String maxBackoff = flumeSinkConfig.getMaxBackoff();
		String application = flumeSinkConfig.getApplication();
		log.info(">>>> flumeSinkService init ing, hosts:" + hosts + ",selector:" + selector + ",maxBackoff:" + maxBackoff + ",application:" + application);
		
		
		if (StringUtils.isEmpty(hosts)) {
			throw new FlumeException("hosts must not be null");
		}
		
		long timeout = RpcClientConfigurationConstants.DEFAULT_REQUEST_TIMEOUT_MILLIS;

		Properties props = new Properties();
		props.setProperty(RpcClientConfigurationConstants.CONFIG_CONNECT_TIMEOUT, String.valueOf(timeout));
		props.setProperty(RpcClientConfigurationConstants.CONFIG_REQUEST_TIMEOUT, String.valueOf(timeout));

		String[] hostsAndPorts = hosts.split(",|;|\\s+");

		// only one machine
		if (hostsAndPorts.length == 1) {
			props.setProperty(RpcClientConfigurationConstants.CONFIG_HOSTS, "h1");
			props.setProperty(RpcClientConfigurationConstants.CONFIG_HOSTS_PREFIX + "h1", hostsAndPorts[0].trim());
			return props;
		}

		StringBuilder names = new StringBuilder();
		int i = 0;
		for (String hostAndPort : hostsAndPorts) {
			if(StringUtils.isNotBlank(hostAndPort)){
				String name = "h" + (i++);
				props.setProperty(RpcClientConfigurationConstants.CONFIG_HOSTS_PREFIX + name, hostAndPort.trim());
				names.append(name).append(" ");
			}
		}
		props.put(RpcClientConfigurationConstants.CONFIG_HOSTS, names.toString());
		props.put(RpcClientConfigurationConstants.CONFIG_CLIENT_TYPE, ClientType.DEFAULT_LOADBALANCE.toString());
		
		if (!StringUtils.isEmpty(selector)) {
			props.put(RpcClientConfigurationConstants.CONFIG_HOST_SELECTOR, selector);
		}

		
		if (!StringUtils.isEmpty(maxBackoff)) {
			long millis = Long.parseLong(maxBackoff.trim());
			if (millis <= 0) {
				throw new FlumeException("Misconfigured max backoff, value must be greater than 0");
			}
			props.put(RpcClientConfigurationConstants.CONFIG_BACKOFF, String.valueOf(true));
			props.put(RpcClientConfigurationConstants.CONFIG_MAX_BACKOFF, maxBackoff);
		}

		return props;
	}

	@Override
	public void sink(String body, Map<String, String> headers) {

		if (rpcClient == null) {
			String errorMsg = "Cannot Append to Appender! Appender either closed or not setup correctly!";
			throw new FlumeException(errorMsg);
		}

		if (!rpcClient.isActive()) {
			reconnect();
		}

		if (null == rpcClient || !rpcClient.isActive()) {
			String errorMsg = "**** rpcClient reconnect fail";
			throw new FlumeException(errorMsg);
		}

		Event event = EventBuilder.withBody(body, UTF_8, headers);

		try {
			rpcClient.append(event);
		} catch (EventDeliveryException e) {
			String msg = "Flume append() failed.";
			throw new FlumeException(msg + " Exception follows.", e);
		}
	}
	

	@Override
	public void sink(FlumeSinkData flumeSinkData) {
		sink(flumeSinkData.getBody(), flumeSinkData.getHeaders());
	}
	
	@Override
	public void sinkBatch(List<FlumeSinkData> list) {
		if (rpcClient == null) {
			String errorMsg = "Cannot Append to Appender! Appender either closed or not setup correctly!";
			throw new FlumeException(errorMsg);
		}

		if (!rpcClient.isActive()) {
			reconnect();
		}

		if (null == rpcClient || !rpcClient.isActive()) {
			String errorMsg = "**** rpcClient reconnect fail";
			throw new FlumeException(errorMsg);
		}

		List<Event> events = new ArrayList<>(list.size());
		for(FlumeSinkData f : list){
			Event event = EventBuilder.withBody(f.getBody(), UTF_8, f.getHeaders());
			events.add(event);
		}
		
		try {
			rpcClient.appendBatch(events);
		} catch (EventDeliveryException e) {
			String msg = "Flume append() failed.";
			throw new FlumeException(msg + " Exception follows.", e);
		}
		
	}
	
	/**
	 * Make it easy to reconnect on failure
	 * 
	 * @throws FlumeException
	 */
	private synchronized void reconnect() {
		stop();
		init();
	}

}

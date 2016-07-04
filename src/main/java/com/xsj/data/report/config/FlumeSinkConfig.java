package com.xsj.data.report.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @author shadow_
 */
@Configuration
@ConfigurationProperties(prefix="flume.sink")
public class FlumeSinkConfig {

	private String hosts;

	private String selector;

	private String maxBackoff;

	private String application;

	public String getHosts() {
		return hosts;
	}

	public void setHosts(String hosts) {
		this.hosts = hosts;
	}

	public String getSelector() {
		return selector;
	}

	public void setSelector(String selector) {
		this.selector = selector;
	}

	public String getMaxBackoff() {
		return maxBackoff;
	}

	public void setMaxBackoff(String maxBackoff) {
		this.maxBackoff = maxBackoff;
	}

	public String getApplication() {
		return application;
	}

	public void setApplication(String application) {
		this.application = application;
	}

}

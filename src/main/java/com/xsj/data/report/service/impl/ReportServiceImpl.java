package com.xsj.data.report.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xsj.data.report.dao.ReportAdminDAO;
import com.xsj.data.report.domain.ReportAppConfig;
import com.xsj.data.report.service.FlumeSinkService;
import com.xsj.data.report.service.ReportService;
import com.xsj.data.report.utils.U;

@Service("reportService")
public class ReportServiceImpl implements ReportService{

	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private ReportAdminDAO reportAdminDAO;
	
	@Autowired
	private FlumeSinkService flumeSinkService;
	
	@Override
	public void report(HttpServletRequest request) {
		
		String appId = request.getParameter("appId");
		if(StringUtils.isBlank(appId)){
			log.warn("**** appId is empty, request ip is [{}]****", U.getClientIp(request));
			return ;
		}
		
		ReportAppConfig config = reportAdminDAO.getReportAppConfigByAppId(appId);
		if(null == config){
			log.warn("**** appId is not register, request ip is [{}]****", U.getClientIp(request));
			return ;
		}
		
		// TODO 
		//1.根据配置，是否需要验证签名
		
		//2.根据配置，获取sink目标，记录在rpc头
		Map<String, String> headers = new HashMap<>();
		
		//3.组装数据body
		String body = "";
		
		//4.调用rpc,发送数据到flume
		flumeSinkService.sink(body, headers);
		
	}

}

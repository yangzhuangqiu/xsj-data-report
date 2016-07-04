package com.xsj.data.report.utils;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

public final class U {

	private U(){}
	
	public static String getClientIp(HttpServletRequest request){
		
		String ip = request.getHeader("X-Forwarded-For");
		if(StringUtils.isNotBlank(ip))
			return ip.trim();
		
		ip = request.getHeader("Proxy-Client-IP");
		if(StringUtils.isNotBlank(ip))
			return ip.trim();
		
		ip = request.getHeader("WL-Proxy-Client-IP");
		if(StringUtils.isNotBlank(ip))
			return ip.trim();
		
		ip = request.getHeader("HTTP_CLIENT_IP");
		if(StringUtils.isNotBlank(ip))
			return ip.trim();
		
		ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		if(StringUtils.isNotBlank(ip))
			return ip.trim();
		
		return request.getRemoteAddr();
		
	}
}

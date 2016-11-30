package com.xsj.data.report.utils;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSON;
/**
 * context holder utils
 */
public class C {
	
	private static final String REQUEST_ID = "com.kingsoft.request.id";
	
	/**
	 * SpringMvc下获取request
	 * @return
	 */
	public static HttpServletRequest getRequest() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		return request;
	}
	
	public static HttpServletResponse getResponse() {
		HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
		return response;
	}
	
	public static String requestToString(){
		
		HttpServletRequest request = getRequest();
		
		if(null == request){
			return "THERE IS NO REQUEST FROM WEB";
		}
		
		StringBuilder sb = new StringBuilder();
		sb.append("Client:").append(getRealIp())
			.append(" RequestId:").append(getRequestId())
			.append(" URI:").append(request.getRequestURI())
			.append(" Params:").append(JSON.toJSONString(request.getParameterMap()));
		return sb.toString();
	}
	
	public static String responseToString(String response){
		
		StringBuilder sb = new StringBuilder();
		sb.append("Server RequestId:").append(getRequestId())
			.append(" Reponse:").append(response);
		
		return sb.toString();
	}
	
	
	
	public static String getRequestId(){
		HttpServletRequest request = getRequest();
		Object requestId = request.getAttribute(REQUEST_ID);
		if(null == requestId){
			requestId = UUID.randomUUID().toString();
			request.setAttribute(REQUEST_ID, requestId);
		}
		return requestId.toString();
	}
	
	/**
	 * SpringMvc下获取session
	 * @return
	 */
	public static HttpSession getSession() {
		HttpSession session = getRequest().getSession();
		return session;
	}
	
	private static boolean isUnknownIp(String ip){
		return "unknown".equalsIgnoreCase(ip);
	}
	
	public static String getRealIp() {
		HttpServletRequest request = getRequest();
        String ip = request.getHeader("X-Forwarded-For");
        
        if (StringUtils.isBlank(ip) || isUnknownIp(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (StringUtils.isBlank(ip) || isUnknownIp(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (StringUtils.isBlank(ip) || isUnknownIp(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (StringUtils.isBlank(ip) || isUnknownIp(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (StringUtils.isBlank(ip) || isUnknownIp(ip)) {
            ip = request.getRemoteAddr();
        }
        if (StringUtils.isBlank(ip)) {
            return null;
        }
        String[] ipArr = ip.split(",");
        return ip = (ipArr.length == 2) ? ipArr[1].trim() : ipArr[0].trim();
    }

}

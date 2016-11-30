package com.xsj.data.report.web.v1.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebFilter(urlPatterns="/v1/*")
public class MyFilter implements Filter{

	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		log.info(">>>> do filter: {}", getClass());
		//HttpServletResponse resp = (HttpServletResponse) response; 
		//resp.addHeader("Access-Control-Allow-Origin", "*");
		//resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");  
		//resp.setHeader("Access-Control-Max-Age", "3600");  
		//resp.setHeader("Access-Control-Allow-Headers", "x-requested-with");  
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
		
		
	}

}

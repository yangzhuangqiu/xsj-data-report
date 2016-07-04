package com.xsj.data.report.domain;

import java.util.Map;

public class FlumeSinkData {

	private String body;
	
	private Map<String, String> headers;

	public FlumeSinkData(String body, Map<String, String> headers) {
		this.body = body;
		this.headers = headers;
	}
	
	public String getBody() {
		return body;
	}

	public Map<String, String> getHeaders() {
		return headers;
	}
	
	
}

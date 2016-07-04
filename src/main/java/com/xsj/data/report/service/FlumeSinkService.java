package com.xsj.data.report.service;

import java.util.List;
import java.util.Map;

import com.xsj.data.report.domain.FlumeSinkData;

public interface FlumeSinkService {

	void sink(String body, Map<String, String> headers);
	
	void sink(FlumeSinkData flumeSinkData);
	
	void sinkBatch(List<FlumeSinkData> list);
}

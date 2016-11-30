package com.xsj.data.report.web.v1.rest;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.time.StopWatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xsj.data.report.service.ReportService;
import com.xsj.data.report.utils.C;

/**
 * @author shadow_
 */
@RestController
@RequestMapping("/v1/test")
public class TestController {

    private final Logger log = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private ReportService reportService;

    @RequestMapping(value={"/c", "/c.gif"})
    public void stat(HttpServletRequest request) throws IOException{
    	StopWatch watch = new StopWatch();
    	watch.start();
    	log.info(C.requestToString());
    	reportService.report(request);
    	
    	watch.stop();
    	log.info(">>>>处理时间：" + watch.getTime());
    }
    
}

package com.xsj.data.report.web.rest.v1;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.time.StopWatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.xsj.data.report.service.ReportService;

/**
 * @author shadow_
 */
@RestController
@RequestMapping("/test")
public class TestController {

    private final Logger log = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private ReportService reportService;

    @RequestMapping(value="/report.gif", method={RequestMethod.GET})
    public void stat(HttpServletRequest request) throws IOException{
    	StopWatch watch = new StopWatch();
    	watch.start();
    	
    	reportService.report(request);
    	
    	watch.stop();
    	log.info(">>>>处理时间：" + watch.getTime());
    }
    
}

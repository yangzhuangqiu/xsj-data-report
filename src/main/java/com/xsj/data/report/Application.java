package com.xsj.data.report;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
//@ServletComponentScan
public class Application {

	static private ApplicationContext ctx;

    public static void main(String[] args){
    	ctx = SpringApplication.run(Application.class,args);
    }

	static public ApplicationContext getContext(){
		return ctx;
	}

}


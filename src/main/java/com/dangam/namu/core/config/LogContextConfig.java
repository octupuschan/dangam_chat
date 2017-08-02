package com.dangam.namu.core.config;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.dangam.namu.core.config.errorlog.CustomLogbackAppender;

import ch.qos.logback.classic.LoggerContext;

@Configuration
public class LogContextConfig implements InitializingBean {

	@Autowired
	private LogConfig logConfig;

	@Override
	public void afterPropertiesSet() throws Exception {
		LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();

		CustomLogbackAppender customLogbackAppender = new CustomLogbackAppender(logConfig);

		customLogbackAppender.setContext(loggerContext);
		customLogbackAppender.setName("customLogbackAppender");
		customLogbackAppender.start();
		loggerContext.getLogger("ROOT").addAppender(customLogbackAppender);
	}
}

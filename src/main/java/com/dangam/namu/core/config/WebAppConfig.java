package com.dangam.namu.core.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.dangam.namu.core.config.filter.LogbackMdcFilter;

@Configuration
@EnableAspectJAutoProxy
@PropertySource("classpath:/props/${SERVER_MODE:local}/application.properties")
public class WebAppConfig extends WebMvcConfigurerAdapter {
	@Value("${dangam.mode}")
	String SERVER_MODE;

	@Bean
	public RequestInfoInterceptor requestInfoInterceptor() {
		return new RequestInfoInterceptor();
	}

	@Bean
	public FilterRegistrationBean logbackMdcFilterRegistrationBean() {
	    FilterRegistrationBean registrationBean = new FilterRegistrationBean();
	    LogbackMdcFilter logbackMdcFilter = new LogbackMdcFilter();
	    registrationBean.setFilter(logbackMdcFilter);
	    registrationBean.setOrder(2);
	    return registrationBean;
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// 개발용
		registry.addResourceHandler("/resources/**").addResourceLocations("WEB-INF/resources/").setCachePeriod(5 * 60);
	}

}
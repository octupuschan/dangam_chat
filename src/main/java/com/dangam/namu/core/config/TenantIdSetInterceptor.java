package com.dangam.namu.core.config;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.dangam.namu.Context;

public class TenantIdSetInterceptor extends HandlerInterceptorAdapter {

	Logger logger = Logger.getLogger(this.getClass().getName());

	@Value("${dangam.namu.tenantId-fix}")
	private String useDefaultTenantId;

	@Value("${dangam.namu.tenantId-fix-value}")
	private String defaultTenantIdValue;

	@Value("${dangam.namu.tenantId-http-header-name}")
	private String tenantIdHeaderName;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		String tenantId = null;
		if("true".equalsIgnoreCase(useDefaultTenantId)){
			tenantId = defaultTenantIdValue;
		}

		tenantId = request.getHeader(tenantIdHeaderName);
		Context.setTenantId(tenantId);
		return true;
	}
}

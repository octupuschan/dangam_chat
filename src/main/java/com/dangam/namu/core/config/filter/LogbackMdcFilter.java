package com.dangam.namu.core.config.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.MDC;

import com.dangam.namu.core.config.RequestWrapper;
import com.dangam.namu.core.config.errorlog.AgentUtils;
import com.dangam.namu.core.config.errorlog.HttpUtils;
import com.dangam.namu.core.config.errorlog.MDCUtil;

public class LogbackMdcFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		RequestWrapper requestWrapper = RequestWrapper.of(request);

		// Set Http Header
		MDCUtil.setJsonValue(MDCUtil.HEADER_MAP_MDC, requestWrapper.headerMap());

		// Set Http Body
		MDCUtil.setJsonValue(MDCUtil.PARAMETER_MAP_MDC, requestWrapper.parameterMap());

//		// If you use SpringSecurity, you could SpringSecurity UserDetail Information.
		MDCUtil.setJsonValue(MDCUtil.USER_INFO_MDC, HttpUtils.getCurrentUser());

		// Set Agent Detail
		MDCUtil.setJsonValue(MDCUtil.AGENT_DETAIL_MDC, AgentUtils.getAgentDetail((HttpServletRequest) request));

		// Set Http Request URI
		MDCUtil.set(MDCUtil.REQUEST_URI_MDC, requestWrapper.getRequestUri());

		try {
			chain.doFilter(request, response);
		} finally {
			MDC.clear();
		}
	}

	@Override
	public void destroy() {

	}
}

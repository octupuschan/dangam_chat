package com.dangam.namu.core.config;

import java.util.Date;
import java.util.Enumeration;
import java.util.Map.Entry;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.dangam.namu.Context;

public class RequestInfoInterceptor implements HandlerInterceptor {

	Logger logger = Logger.getLogger(this.getClass().getName());

	public static final String LINE = "####################################################### \n";

	public static final String LINE2 = "------------------------------------------------------- \n";

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		Context.requestId.set(new Date().getTime());
		print(request, response);
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}

	private void print(HttpServletRequest request, HttpServletResponse response) {
		StringBuffer sb = new StringBuffer();
		String uri = request.getRequestURI();

		sb.append("\n");
		sb.append(LINE);
		sb.append(String.format("# Request id = %d [%s] \n", Context.requestId.get(), request.getMethod()));
		sb.append(String.format("# URI = %s \n", uri));

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		// System.out.println(" #### test:" + auth.getName() == null ? "NULL" :
		// auth.getName());
		sb.append(String.format("# user = %s \n", (auth == null ? "NULL" : auth.getName())));

		// Header
		Enumeration<String> headerNames = request.getHeaderNames();
		sb.append(LINE2);
		sb.append("# Headers \n");
		sb.append(LINE2);

		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			String value = request.getHeader(key);

			sb.append(String.format("# \t%s = %s \n", key, value));
		}

		// Param
		if (request.getParameterMap().size() > 0) {
			sb.append(LINE2);
			sb.append("# Params \n");
			sb.append(LINE2);

			for (Entry<String, String[]> e : request.getParameterMap().entrySet()) {
				for (String v : e.getValue()) {
					sb.append(String.format("# \t%s = %s \n", e.getKey(), v));
				}
			}
		}

		sb.append(LINE);

		logger.info(sb.toString());
	}
}

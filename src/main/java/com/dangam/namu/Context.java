package com.dangam.namu;

public class Context {
	public static ThreadLocal<Long> requestId = new ThreadLocal<Long>();

	private static ThreadLocal<String> tenantIdLocal = new ThreadLocal<String>();

	public static void setTenantId(String tenantId){
		tenantIdLocal.set(tenantId);
	}

	public static String getTenantId(){
		return tenantIdLocal.get();
	}
}

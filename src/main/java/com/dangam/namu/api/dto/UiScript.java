package com.dangam.namu.api.dto;

public class UiScript {
	String name;
	String type;
	UiScript_2 uiScript;
	
	public String getName() { //uiScript 이름. 
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public UiScript_2 getUiScript() {
		return uiScript;
	}
	public void setUiScript(UiScript_2 uiScript) {
		this.uiScript = uiScript;
	}
	
	
	
}

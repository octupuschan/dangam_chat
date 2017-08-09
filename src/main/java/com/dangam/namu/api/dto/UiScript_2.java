package com.dangam.namu.api.dto;

public class UiScript_2 {
	String type;
	Options options[];
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Options[] getOptions() {
		return options;
	}
	public void setOptions(Options[] options) {
		this.options = options;
	}
	public int getOptionsLength() {
		return options.length;
	}
	
	
}

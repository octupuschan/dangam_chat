package com.dangam.namu.api.dto;

public class Inbi {
	int status_code;
	Data data;
	String status;
	boolean whether; //uiScript의 존재 여부(give info about just message or not) 
	
	
	public int getStatus_code() {
		return status_code;
	}
	public void setStatus_code(int status_code) {
		this.status_code = status_code;
	}
	public Data getData() {
		return data;
	}
	public void setData(Data data) {
		this.data = data;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public void setWhether(boolean whether)
	{
		if(data.getUiScript()==null)
		{
			this.whether=false;
		}
		else
		{
			this.whether=true;
		}
	}
	public boolean getWhether() {
		return whether;
	}
	
}

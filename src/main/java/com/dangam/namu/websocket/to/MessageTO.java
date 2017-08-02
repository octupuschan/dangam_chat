package com.dangam.namu.websocket.to;

import java.io.Serializable;

public class MessageTO implements Serializable{

	private String content;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}


}

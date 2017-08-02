package com.dangam.namu.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageContoller {


	@MessageMapping("/hello")
	@SendTo("/topic/roomId")
	public String broadcast(String message){

		return message;

	}
}

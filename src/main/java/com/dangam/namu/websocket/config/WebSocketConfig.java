package com.dangam.namu.websocket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.server.HandshakeHandler;

import com.dangam.namu.websocket.handler.DangamWebSocketHandler;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {
	@Bean
	public HandshakeHandler handshakeHandler() {
		return new DangamWebSocketHandler();
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry configurer) {
		configurer.enableSimpleBroker("/topic");
		configurer.setApplicationDestinationPrefixes("/app");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/websockethandler").withSockJS();
	}

}

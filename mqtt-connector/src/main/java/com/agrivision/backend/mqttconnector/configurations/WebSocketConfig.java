package com.agrivision.backend.mqttconnector.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
    @Override
    public void configureMessageBroker(final MessageBrokerRegistry config){
        config.enableSimpleBroker("/topic/sensor-data", "/topic/box-control");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.addEndpoint("/chat").setAllowedOrigins("http://localhost:3000", "https://agri-web-app.vercel.app");
        registry.addEndpoint("/chat").setAllowedOrigins("http://localhost:3000", "https://agri-web-app.vercel.app").withSockJS();
    }
}

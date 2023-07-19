package com.agrivision.backend.mqttconnector.mqttToApp;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Controller
public class MessageController {
    private final SensorDataHandler handler;
    public MessageController(SensorDataHandler handler){
        this.handler = handler;
    }
    @MessageMapping("/chat")
    @SendTo("/topic/box-control")
    public String send(String message) {
        handler.sendMessage(message);
        return message;
    }
}

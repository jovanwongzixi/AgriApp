package com.agrivision.backend.mqttconnector.mqttToApp;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class MessageController {
    private final SensorDataHandler handler;
    public MessageController(SensorDataHandler handler){
        this.handler = handler;
    }
    @MessageMapping("/chat")
    @SendTo("/topic/box-control")
    public OutputMessage send(Message message) throws Exception{
        handler.sendMessage();
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        return new OutputMessage(message.getFrom(), message.getText(), time);
    }
}

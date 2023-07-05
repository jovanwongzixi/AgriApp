package com.agrivision.backend.mqttconnector.mqttToApp;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private String from;
    private String text;
    public String getText() {
        return text;
    }

    public String getFrom() {
        return from;
    }
}

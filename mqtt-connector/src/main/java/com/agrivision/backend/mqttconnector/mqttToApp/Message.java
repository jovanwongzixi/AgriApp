package com.agrivision.backend.mqttconnector.mqttToApp;

public class Message {
    private String from;
    private String text;
    public Message(){}
    public String getText() {
        return text;
    }

    public String getFrom() {
        return from;
    }
}

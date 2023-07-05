package com.agrivision.backend.mqttconnector.mqttToApp;

import lombok.Data;

import java.io.Serializable;

@Data
public class BoxControlMessage implements Serializable {
    private String AgriBoxID;
    private String Pump_status;
    private String Fan_status;
}

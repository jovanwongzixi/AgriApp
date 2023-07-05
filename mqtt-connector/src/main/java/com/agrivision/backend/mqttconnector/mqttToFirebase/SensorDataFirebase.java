package com.agrivision.backend.mqttconnector.mqttToFirebase;

import lombok.Data;

import java.util.Date;

@Data
public class SensorDataFirebase {
    private Float pH;
    private Float temperature;
    private Float humidity;
    private Float ec;
    private Date timestamp;
}

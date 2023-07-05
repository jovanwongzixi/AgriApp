package com.agrivision.backend.mqttconnector.mqttToApp;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SensorDataMessage {
    private String agriBoxID;
    private String accounter;
    private String pH;
    private String temperature;
    private String humidity;
    private String ec;
    private String pumpStatus;
    private String fanStatus;
    private String latency;
    public void setAttribute(String key, String value){
        switch(key){
            case "AgriBoxID" -> this.setAgriBoxID(value);
            case "Accounter" -> this.setAccounter(value);
            case "PH" -> this.setPH(value);
            case "Temperature" -> this.setTemperature(value);
            case "Humidity" -> this.setHumidity(value);
            case "EC" -> this.setEc(value);
            case "Pump_status" -> this.setPumpStatus(value); //should standardise to camelcase
            case "Fan_status" -> this.setFanStatus(value);
            case "Latency" -> this.setLatency(value);
            default -> throw new RuntimeException("Key value not valid!");
        }
    }
}

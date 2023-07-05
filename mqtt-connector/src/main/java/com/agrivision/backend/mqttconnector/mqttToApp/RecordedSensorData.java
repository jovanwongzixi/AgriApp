package com.agrivision.backend.mqttconnector.mqttToApp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecordedSensorData {
    @Id
    private String boxID;
    private Float pH;
    private Float temperature;
    private Float humidity;
    private Float ec;
    private Float count; //number of times written to db, data will be reset after sending data to firebase
}

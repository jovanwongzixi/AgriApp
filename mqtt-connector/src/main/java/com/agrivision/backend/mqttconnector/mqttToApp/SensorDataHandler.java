package com.agrivision.backend.mqttconnector.mqttToApp;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
@Component
public class SensorDataHandler implements Callable<Void> {
    private final IMqttClient client;
    private final RecordedSensorDataService recordedSensorDataService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    private static final Logger log = LoggerFactory.getLogger(SensorDataHandler.class);
    public SensorDataHandler(IMqttClient client, RecordedSensorDataService recordedSensorDataService){
        this.client = client;
        this.recordedSensorDataService = recordedSensorDataService;
    }
    @Bean
    @Override
    public Void call() throws Exception{
        if(!client.isConnected()){
            log.info("[I31] Client not connected.");
            return null;
        }
        log.info("[I31] Client is connected.");
        return null;
    }
    public void sendMessage(String message){
        byte[] payload = message.getBytes();
        MqttMessage msg = new MqttMessage(payload);
        try {
            client.publish("box-control",msg);
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }
    @Bean
    public void receiveMessage() throws MqttException, InterruptedException {
        CountDownLatch receivedSignal = new CountDownLatch(10);
        client.subscribe("sensor-data", (topic, msg) -> {
//            byte[] payload = msg.getPayload();
            log.info("------------Payload: " + msg.toString()); //subscribes from hivemq successfully
            SensorDataMessage message = convertMqttMessageToSensorDataMessage(msg);
            this.simpMessagingTemplate.convertAndSend("/topic/sensor-data", message);
            log.info("----------- SensorDataMessage sent" + message.getAccounter());

            this.recordedSensorDataService.updateData(message); // update database for computation of rolling average

            receivedSignal.countDown();
        });
        receivedSignal.await(1, TimeUnit.MINUTES);
    }

    private SensorDataMessage convertMqttMessageToSensorDataMessage(MqttMessage msg){
        String message = msg.toString().strip();
        String[] splitMessage = message.substring(1,message.length()-1).split(",");
        SensorDataMessage sensorDataMessage = new SensorDataMessage();
        for (String s : splitMessage){
            String[] keyValueArray = s.split("\""); // key at index 1, value at index 3
            sensorDataMessage.setAttribute(keyValueArray[1], keyValueArray[3]);
//            log.info("----Key: " + keyValueArray[1] + " Value: " + keyValueArray[3]);
        }
        return sensorDataMessage;
    }
}

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
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    private static final Logger log = LoggerFactory.getLogger(SensorDataHandler.class);
    public SensorDataHandler(IMqttClient client){
        this.client = client;
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
    public void sendMessage(){
        byte[] payload = "hello".getBytes();
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
            byte[] payload = msg.getPayload();
            log.info("------------Payload: " + msg); //subscribes from hivemq successfully
            this.simpMessagingTemplate.convertAndSend("/topic/sensor-data",msg);
            receivedSignal.countDown();
        });
        receivedSignal.await(1, TimeUnit.MINUTES);
    }


}

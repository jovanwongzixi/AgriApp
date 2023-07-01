package com.agrivision.backend.mqttconnector.configurations;

import javax.net.ssl.SSLSocketFactory;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;
import java.util.UUID;
@Configuration
public class MqttConfig {
    @Value("${MQTT_BROKER_URI}")
    private String mqttServerURI;
    @Value("${MQTT_CLIENT_USERNAME}")
    private String mqttClientUsername;
    @Value("${MQTT_CLIENT_PASSWORD}")
    private String mqttClientPassword;
    @Bean
    public IMqttClient setIMqttClient() {
        String publisherId = UUID.randomUUID().toString();
        IMqttClient publisher;
        MqttConnectOptions options = new MqttConnectOptions();
        try {
            publisher = new MqttClient(mqttServerURI, publisherId);
            options.setAutomaticReconnect(true);
            options.setCleanSession(true);
            options.setConnectionTimeout(10);
            options.setUserName(mqttClientUsername);
            options.setPassword(mqttClientPassword.toCharArray());
            options.setSocketFactory(SSLSocketFactory.getDefault());
            publisher.connect(options);
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
        return publisher;
    }
}

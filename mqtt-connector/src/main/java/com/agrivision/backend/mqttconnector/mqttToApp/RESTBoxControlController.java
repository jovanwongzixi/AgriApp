package com.agrivision.backend.mqttconnector.mqttToApp;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/box-control")
public class RESTBoxControlController {
    private final SensorDataHandler handler;

    public RESTBoxControlController(SensorDataHandler handler){
        this.handler = handler;
    }
    @GetMapping("/")
    public ResponseEntity<String> sendControl(){
//        handler.sendMessage();
        return new ResponseEntity<>("Sent",HttpStatus.OK);
    }
}

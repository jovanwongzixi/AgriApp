package com.agrivision.backend.mqttconnector.mqttToFirebase;

import com.agrivision.backend.mqttconnector.mqttToApp.RecordedSensorData;
import com.agrivision.backend.mqttconnector.mqttToApp.RecordedSensorDataService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.firebase.FirebaseApp;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseDataHandler {

    private final Firestore firestoreDb;
    private final RecordedSensorDataService recordedSensorDataService;
    private static final Logger log = LoggerFactory.getLogger(FirebaseDataHandler.class);
    public FirebaseDataHandler(FirebaseApp firebaseApp, RecordedSensorDataService recordedSensorDataService){
        this.firestoreDb = FirestoreClient.getFirestore(firebaseApp);
        this.recordedSensorDataService = recordedSensorDataService;
    }

    @Scheduled(cron = "0 11 23 * * ?", zone = "Asia/Singapore")
    public void pushDataToFireStore() throws ExecutionException, InterruptedException {
//        Map<String, Object> data = new HashMap<>();
//        data.put("from", "spring boot");
//        data.put("temperature", 32.3);

        // get data
        RecordedSensorData data = recordedSensorDataService.getData("box1");

        // calculate rolling avg data to send to firebase
        SensorDataFirebase rollingAvgData = new SensorDataFirebase();
        Float count = data.getCount();
        rollingAvgData.setPH(data.getPH()/count);
        rollingAvgData.setTemperature(data.getTemperature()/count);
        rollingAvgData.setHumidity(data.getHumidity()/count);
        rollingAvgData.setEc(data.getEc()/count);
        rollingAvgData.setTimestamp(new Date());
        // send to firebase
        ApiFuture<DocumentReference> addedDocRef = firestoreDb.collection("box1").add(rollingAvgData);
        log.info("-------Added new firestore doc " + addedDocRef.get().getId());

        // delete from database
        recordedSensorDataService.deleteData("box1");
    }
}

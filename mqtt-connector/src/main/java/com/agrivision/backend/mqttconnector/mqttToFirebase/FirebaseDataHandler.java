package com.agrivision.backend.mqttconnector.mqttToFirebase;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.firebase.FirebaseApp;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseDataHandler {

    private final Firestore firestoreDb;

    private static final Logger log = LoggerFactory.getLogger(FirebaseDataHandler.class);
    public FirebaseDataHandler(FirebaseApp firebaseApp){
        this.firestoreDb = FirestoreClient.getFirestore(firebaseApp);
    }

    @Scheduled(cron = "0 28 14 * * ?", zone = "Asia/Singapore")
    public void pushDataToFireStore() throws ExecutionException, InterruptedException {
        Map<String, Object> data = new HashMap<>();
        data.put("from", "spring boot");
        data.put("temperature", 32.3);
        ApiFuture<DocumentReference> addedDocRef = firestoreDb.collection("box1").add(data);
        log.info("-------Added new firestore doc " + addedDocRef.get().getId());
    }
}

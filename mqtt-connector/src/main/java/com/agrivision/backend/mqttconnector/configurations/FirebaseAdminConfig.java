package com.agrivision.backend.mqttconnector.configurations;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;

@Configuration
@EnableScheduling
public class FirebaseAdminConfig {
    @Value("${FIREBASE_ADMIN_SECRET_KEY_FILE_PATH}")
    private String firebaseAdminSecretKeyFilePath;
    private final ResourceLoader resourceLoader;
    @Value("${FIREBASE_DATABASE_URL}")
    private String firebaseDatabaseURL;

    public FirebaseAdminConfig(ResourceLoader resourceLoader){
        this.resourceLoader=resourceLoader;
    }
    @Bean
    public FirebaseApp initFirebaseApp() throws IOException {
//        FileInputStream serviceAccount = new FileInputStream(resourceFile.getFile());
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(resourceLoader.getResource("classpath:/"+firebaseAdminSecretKeyFilePath).getInputStream()))
                .setDatabaseUrl(firebaseDatabaseURL)
                .build();
        return FirebaseApp.initializeApp(options);
    }
}

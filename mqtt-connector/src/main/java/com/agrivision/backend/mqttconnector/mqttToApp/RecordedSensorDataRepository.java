package com.agrivision.backend.mqttconnector.mqttToApp;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordedSensorDataRepository extends CrudRepository<RecordedSensorData, String> {
}

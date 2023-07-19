package com.agrivision.backend.mqttconnector.mqttToApp;

import org.springframework.stereotype.Service;

@Service
public class RecordedSensorDataService {
    private final RecordedSensorDataRepository recordedSensorDataRepository;
    public RecordedSensorDataService(RecordedSensorDataRepository recordedSensorDataRepository){
        this.recordedSensorDataRepository = recordedSensorDataRepository;
    }

    // Read single box data
    public RecordedSensorData getData(String boxID){
        if (recordedSensorDataRepository.findById(boxID).isPresent()) return recordedSensorDataRepository.findById(boxID).get(); // error handling if not found?
        return null;
    }
    // Update value
    public RecordedSensorData updateData(SensorDataMessage message){
        if(recordedSensorDataRepository.findById(message.getAgriBoxID()).isEmpty()){
            return this.createRecord(message);
        }

        RecordedSensorData recordedSensorDataDB = recordedSensorDataRepository.findById(message.getAgriBoxID()).get();
        Float count = recordedSensorDataDB.getCount();
        if(message.getEc() == null){
            recordedSensorDataDB.setEc(recordedSensorDataDB.getEc()/count*(count+1));
        }
        else{
            recordedSensorDataDB.setEc(recordedSensorDataDB.getEc() + Float.parseFloat(message.getEc()));
        }

        if(message.getPH() == null){
            recordedSensorDataDB.setPH((recordedSensorDataDB.getPH()/count*(count+1)));
        }
        else{
            recordedSensorDataDB.setPH(recordedSensorDataDB.getPH() + Float.parseFloat(message.getPH()));
        }

        if(message.getTemperature() == null){
            recordedSensorDataDB.setTemperature((recordedSensorDataDB.getTemperature()/count*(count+1)));
        }
        else{
            recordedSensorDataDB.setTemperature(recordedSensorDataDB.getTemperature() + Float.parseFloat(message.getTemperature()));
        }

        if(message.getHumidity() == null){
            recordedSensorDataDB.setHumidity((recordedSensorDataDB.getHumidity()/count*(count+1)));
        }
        else{
            recordedSensorDataDB.setHumidity(recordedSensorDataDB.getHumidity() + Float.parseFloat(message.getHumidity()));
        }

        recordedSensorDataDB.setCount(recordedSensorDataDB.getCount()+1);
        return recordedSensorDataRepository.save(recordedSensorDataDB);
    }

    public void deleteData(String boxID){
        recordedSensorDataRepository.deleteById(boxID); // could delete all potentially?
    }
    private RecordedSensorData createRecord(SensorDataMessage message){
        RecordedSensorData recordedSensorData = new RecordedSensorData();
        recordedSensorData.setBoxID(message.getAgriBoxID());
        recordedSensorData.setPH(Float.parseFloat(message.getPH()));
        recordedSensorData.setEc(Float.parseFloat(message.getEc()));
        recordedSensorData.setTemperature(Float.parseFloat(message.getTemperature()));
        recordedSensorData.setHumidity(Float.parseFloat(message.getHumidity()));
        recordedSensorData.setCount(1F);
        return recordedSensorDataRepository.save(recordedSensorData);
    }
}

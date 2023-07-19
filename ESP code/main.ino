//works! integrated ph sensor 
//--------------------Importing Packages--------------------
#include "PubSubClient.h"
#include "WiFi.h" 
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include "DFRobot_EC10.h"
#include "DFRobot_ESP_EC.h"
#include "Adafruit_ADS1X15.h" //REPLACE 1015 WITH 1X15
#include <EEPROM.h>
#include <Arduino.h>
#include <Wire.h>
#include "Adafruit_SHT31.h"
#include <ArduinoJson.h>



//-------------------Define multi wifi object-------------------------
WiFiMulti wifiMulti;
const char* ssid = "SLZ";
const char* password =  "12345678";



//-------------------MQTT Set-up-------------------------
static const char *root_ca PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY
MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJHP0FDfzm54rVygc
h77ct984kIxuPOZXoHj3dcKi/vVqbvYATyjb3miGbESTtrFj/RQSa78f0uoxmyF+
0TM8ukj13Xnfs7j/EvEhmkvBioZxaUpmZmyPfjxwv60pIgbz5MDmgK7iS4+3mX6U
A5/TR5d8mUgjU+g4rk8Kb4Mu0UlXjIB0ttov0DiNewNwIRt18jA8+o+u3dpjq+sW
T8KOEUt+zwvo/7V3LvSye0rgTBIlDHCNAymg4VMk7BPZ7hm/ELNKjD+Jo2FR3qyH
B5T0Y3HsLuJvW5iB4YlcNHlsdu87kGJ55tukmi8mxdAQ4Q7e2RCOFvu396j3x+UC
B5iPNgiV5+I3lg02dZ77DnKxHZu8A/lJBdiB3QW0KtZB6awBdpUKD9jf1b0SHzUv
KBds0pjBqAlkd25HN7rOrFleaJ1/ctaJxQZBKT5ZPt0m9STJEadao0xAH0ahmbWn
OlFuhjuefXKnEgV4We0+UXgVCwOPjdAvBbI+e0ocS3MFEvzG6uBQE3xDk3SzynTn
jh8BCNAw1FtxNrQHusEwMFxIt4I7mKZ9YIqioymCzLq9gwQbooMDQaHWBfEbwrbw
qHyGO0aoSCqI3Haadr8faqU9GY/rOPNk3sgrDQoo//fb4hVC1CLQJ13hef4Y53CI
rU7m2Ys6xt0nUW7/vGT1M0NPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBR5tFnme7bl5AFzgAiIyBpY9umbbjANBgkq
hkiG9w0BAQsFAAOCAgEAVR9YqbyyqFDQDLHYGmkgJykIrGF1XIpu+ILlaS/V9lZL
ubhzEFnTIZd+50xx+7LSYK05qAvqFyFWhfFQDlnrzuBZ6brJFe+GnY+EgPbk6ZGQ
3BebYhtF8GaV0nxvwuo77x/Py9auJ/GpsMiu/X1+mvoiBOv/2X/qkSsisRcOj/KK
NFtY2PwByVS5uCbMiogziUwthDyC3+6WVwW6LLv3xLfHTjuCvjHIInNzktHCgKQ5
ORAzI4JMPJ+GslWYHb4phowim57iaztXOoJwTdwJx4nLCgdNbOhdjsnvzqvHu7Ur
TkXWStAmzOVyyghqpZXjFaH3pO3JLF+l+/+sKAIuvtd7u+Nxe5AW0wdeRlN8NwdC
jNPElpzVmbUq4JUagEiuTDkHzsxHpFKVK7q4+63SM1N95R1NbdWhscdCb+ZAJzVc
oyi3B43njTOQ5yOf+1CceWxG1bQVs5ZufpsMljq4Ui0/1lvh+wjChP4kqKOJ2qxq
4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA
mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d
emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=
-----END CERTIFICATE-----
)EOF";

// MQTT
const char* mqtt_server = "e4e39c52cf134a18afe10e5a37efd563.s1.eu.hivemq.cloud"; //the MQTT broker
const char* clientID = "ros2mqtt"; // must be unique to each client
const char* mqtt_username = "testing"; // MQTT username
const char* mqtt_password = "Testing@123"; // MQTT password



//-------------------Defining Variables-------------------------
const int EC_PIN = 12;
const int pH_Pin = 35;
#define Offset 1.73 //Offset for pH
float EC_voltage = 25.0; //arbitrary value set for calibration
float EC_reading = 25.0; //arbitrary value set for calibration
float temperature_reading = 25.0; //arbitrary value set for calibration
float humidity_reading = 25.0; //arbitrary value set for calibration
float pH_reading = 25.0; //arbitrary value set for calibration
float reading_time = 25.0; //arbitrary value set for calibration
const int fan_pin = 26; 
const int pump_pin = 27;
String pump_status = "off";
String fan_status = "off";
int count = 1;
unsigned long last_msg_time; 



//-------------------Initialising components-------------------------
// Initialise the WiFi and MQTT Client objects
WiFiClientSecure wifiClient;
// 1883 is the listener port for the Broker
PubSubClient client(wifiClient);
//EC sensor
DFRobot_ESP_EC ec;
Adafruit_ADS1115 ads;
//SHT31
Adafruit_SHT31 sht31 = Adafruit_SHT31();
//Initialise JSON
DynamicJsonDocument input_doc(1024);
DynamicJsonDocument output_doc(1024);



void sendToCom(char* topic, String input_data){
  Serial.setTimeout(2000);

  //MQTT can only transmit strings, leave them as char when publishing
  String sent_data = String(input_data); 

  // PUBLISH to the MQTT Broker (topic = Humidity)
  if (client.publish(topic, sent_data.c_str())) {
    Serial.println("Publishing data: " + String(topic) + " "+ String(sent_data) + "...ok");
  }
  else {
    Serial.println("Publishing data failed. Reconnecting to MQTT Broker and trying again");
    client.connect(clientID, mqtt_username, mqtt_password);
    delay(10); // This delay ensures that client.publish doesn’t clash with the client.connect call
    client.publish(topic, sent_data.c_str());
    Serial.println("Republishing data: " + String(topic) + " "+ String(sent_data) + "...ok");
  }
}



void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  deserializeJson(output_doc, messageTemp);
  if (output_doc["AgriBoxID"] == "box1"){
    //For the relay, the digital write is inverted
    //To turn on module,use digitalWrite(pin, LOW)
    //To turn off module,use digitalWrite(pin, HIGH)

    if (output_doc["Pump_status"] == "on"){
      //turn on the pump
      pump_status = "on";
      digitalWrite(pump_pin, LOW);
      Serial.println("pump_pin: LOW");
    }
    else {
      //turn off pump
      pump_status = "off";
      digitalWrite(pump_pin, HIGH);
      Serial.println("pump_pin: HIGH");
    }

    if (output_doc["Fan_status"] == "on"){
      //turn on the pump
      fan_status = "on";
      digitalWrite(fan_pin, LOW);
      Serial.println("fan_pin: LOW");
    }
    else {
      //turn off pump
      fan_status = "off";
      digitalWrite(fan_pin, HIGH);
      Serial.println("fan_pin: HIGH");
    }
  }
}



void setup() {
  Serial.begin(115200);
  pinMode(pH_Pin,INPUT);
  pinMode(fan_pin, OUTPUT);
  pinMode(pump_pin, OUTPUT);
  delay(1000);
  digitalWrite(pump_pin, HIGH); //default is off
  digitalWrite(fan_pin, HIGH); //default is off


  //--------------------Wifi Connection-------------------- 
  WiFi.mode(WIFI_STA);
  
  // Add list of wifi networks
  wifiMulti.addAP("SLZ", "12345678"); //LieZhou's hotspot
  wifiMulti.addAP("AndroidAPd14b", "zxjo2295"); //Jovan's hotspot
  wifiMulti.addAP("AndroidAP43C1", "kxyy1592"); //YongJing's hotspot
  wifiMulti.addAP("G", "zhiyuan1"); //Zhiyuan's hotspot
  wifiMulti.addAP("Acetaldehyde22", "zhiyuan1");
  // WiFi.scanNetworks will return the number of networks found
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0) {
      Serial.println("no networks found");
  } 
  else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      // Print SSID and RSSI for each network found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(")");
      Serial.println((WiFi.encryptionType(i) == WIFI_AUTH_OPEN)?" ":"*");
      delay(10);
    }
  }

  // Connect to Wi-Fi using wifiMulti (connects to the SSID with strongest connection)
  Serial.println("Connecting Wifi...");
  if(wifiMulti.run() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  }


  //--------------------MQTT Login-------------------- 
  wifiClient.setCACert(root_ca);      //enable this line and the the "certificate" code for secure connection

  client.setServer(mqtt_server, 8883);
  client.setCallback(callback);
  client.setKeepAlive(60); //set the transmitting channel active for 60 seconds

  // Connect to MQTT Broker
  if (client.connect(clientID, mqtt_username, mqtt_password)) {
    Serial.println("Connected to MQTT Broker (computer)!");
    //bool buffer_result = client.setBufferSize(2048);
    client.subscribe("box-control");
    //Serial.println(subscribe);
  }
  else {
    Serial.println(client.state());
    Serial.println("Connection to MQTT Broker (computer) failed…");
  }
  

  //--------------------EC set-up-------------------- 
  EEPROM.begin(32);//needed EEPROM.begin to store calibration k in eeprom
  ec.begin();//by default lib store calibration k since 10 change it by set ec.begin(30); to start from 30
  ads.setGain(GAIN_ONE);
  ads.begin();


  //--------------------Temp and humidity set-up-------------------- 
  if (! sht31.begin(0x44)){
    Serial.println("Couldn't find SHT31");
    while (1) delay(1);
  }
}

void loop() {
  // If the connection to the strongest hotspot is lost, it will connect to the next strongest network on the list
  if (wifiMulti.run() != WL_CONNECTED) {
    Serial.print("WiFi not connected: ");
  }
  client.loop();
  char Accounter[10]; // Adjust the size based on the expected range of count values
  itoa(count, Accounter, 10); // Convert count to a character array

  unsigned long current_time = millis();
  // Set delay here instead of using delay(), so loop() will run more frequently to subscribe to control data more often
  // Test 30 seconds for now
  if (current_time - last_msg_time > 30000U) {
    last_msg_time = current_time;
    Serial.print("Accounter: ");
    Serial.println(Accounter);
    float latency_starttime = millis();

    //--------------------pH sensor--------------------
    float analog_value_pH_sensor = analogRead(pH_Pin);
    float pH_voltage = analog_value_pH_sensor * (3.3 / 4095.0);
    float pH_reading = (3.3 * pH_voltage + Offset);

    //--------------------temphumidity sensor--------------------
    float temperature_reading = sht31.readTemperature();
    float humidity_reading = sht31.readHumidity();

    //--------------------EC sensor--------------------
    float EC_voltage = ads.readADC_SingleEnded(0) / 10; // Read the voltage
    float EC_reading = ec.readEC(EC_voltage, temperature_reading); // Convert voltage to EC with temperature compensation

    if (!isnan(pH_reading)) {
      Serial.print("pH = ");
      Serial.println(pH_reading);
    }
    else {
      Serial.println("Failed to read pH");
    }

    if (!isnan(temperature_reading)) {
      Serial.print("temperature (*C) = ");
      Serial.println(temperature_reading);
    }
    else {
      Serial.println("Failed to read temperature");
    }

    if (!isnan(humidity_reading)) {
      Serial.print("humidity (%) = ");
      Serial.println(humidity_reading);
    }
    else {
      Serial.println("Failed to read humidity");
    }

    if (!isnan(EC_reading)) {
      Serial.print("EC_value (ms/cm) = ");
      Serial.println(EC_reading);
    }
    else {
      Serial.println("Failed to read EC_value");
    }

    // millis() should have unsigned long data type, not sure if declaring as float will affect accuracy
    float latency_endtime = millis();
    float reading_time = latency_endtime - latency_starttime;
    Serial.print("Latency (ms) = ");
    Serial.println(reading_time);

    // Convert sensor data to character arrays
    char pH[10];
    char temperature[10];
    char humidity[10];
    char EC[10];
    char Latency[10];

    dtostrf(pH_reading, 4, 2, pH); // Convert pH_reading to a character array
    dtostrf(temperature_reading, 4, 2, temperature); // Convert temperature_reading to a character array
    dtostrf(humidity_reading, 4, 2, humidity); // Convert humidity_reading to a character array
    dtostrf(EC_reading, 4, 2, EC); // Convert EC_reading to a character array
    dtostrf(reading_time, 4, 2, Latency); // Convert reading_time to a character array

    float start_sendToCom_time = millis();

    StaticJsonDocument<200> input_doc;
    input_doc["AgriBoxID"] = "box1";
    input_doc["Accounter"] = Accounter;
    input_doc["PH"] = pH;
    input_doc["Temperature"] = temperature;
    input_doc["Humidity"] = humidity;
    input_doc["EC"] = EC;
    input_doc["Pump_status"] = pump_status;
    input_doc["Fan_status"] = fan_status;
    // Add other variables to the input_doc if needed

    String output;
    serializeJson(input_doc, output);

    sendToCom("sensor-data", output);

    float end_sendToCom_time = millis();
    float sendToCom_time = end_sendToCom_time - start_sendToCom_time;
    Serial.print("sendToCom_time (ms): ");
    Serial.println(sendToCom_time);
    Serial.println();

    count++;
  }
}

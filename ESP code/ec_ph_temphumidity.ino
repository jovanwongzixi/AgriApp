//pH and EC
//EC sensor definitions
#include "DFRobot_EC10.h"
#include <EEPROM.h>

#define EC_PIN 12
float voltage,ecValue,temperature = 25;
DFRobot_EC10 ec;

//temphumidity sensor definitions
#include <Arduino.h>
#include <Wire.h>
#include "Adafruit_SHT31.h"
 
//pH sensor definitions
const int potPin=A0;
float ph;
float Value=0;

Adafruit_SHT31 sht31 = Adafruit_SHT31();
 
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  //pH
  pinMode(potPin,INPUT);
  delay(1000);

  //EC
  ec.begin();

  //temphumidity
  if (! sht31.begin(0x44))
  {
  Serial.println("Couldn't find SHT31");
  while (1) delay(1);
  }
}
 void loop(){

    static unsigned long timepoint = millis();
    if(millis()-timepoint>1000U)  //time interval: 1s
    {
      //EC sensor...........
      timepoint = millis();
      voltage = analogRead(EC_PIN)/1024.0*5000;   // read the voltage
           //temperature = readTemperature();          // read your temperature sensor to execute temperature compensation
      ecValue =  ec.readEC(voltage,temperature);  // convert voltage to EC with temperature compensation
      Serial.print("temperature:");
      Serial.print(temperature,1);
      Serial.print("^C  EC:");
      Serial.print(ecValue,2);
      Serial.println("ms/cm");

      //pH sensor............
      Value= analogRead(potPin);
      //Serial.print(Value);
      //Serial.print(" | ");
      float voltage=Value*(3.3/4095.0);
      ph=(3.3*voltage);
      Serial.print("pH: ");
      Serial.println(ph);

      //temphumidity sensor............
      float t = sht31.readTemperature();
      float h = sht31.readHumidity();
      
      if (! isnan(t))
      {
      Serial.print("Temp *C = "); Serial.println(t);
      }
      else
      {
      Serial.println("Failed to read temperature");
      }
      
      if (! isnan(h))
      {
      Serial.print("Hum. % = "); Serial.println(h);
      }
      else
      {
      Serial.println("Failed to read humidity");
      }
      Serial.println();

      Serial.print("Latency (ms): ");
      Serial.println(millis()-timepoint);
    }
    ec.calibration(voltage,temperature);          // calibration process by Serail CMD
 }

 
float readTemperature()
{
  //add your code here to get the temperature from your temperature sensor
}
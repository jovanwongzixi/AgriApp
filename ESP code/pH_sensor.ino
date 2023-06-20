
const int potPin=A0;
float ph;
float Value=0;
 
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(potPin,INPUT);
  delay(1000);
}
 void loop(){
 
    Value= analogRead(potPin);
    Serial.print(Value);
    Serial.print(" | ");
    float voltage=Value*(3.3/4095.0);
    ph=(3.3*voltage);
    Serial.println(ph);
    delay(500);
 }
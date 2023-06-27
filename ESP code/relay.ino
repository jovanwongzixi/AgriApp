const int fan = 26; //fan
const int pump = 27;
void setup() {
  Serial.begin(115200);
  pinMode(fan, OUTPUT);
  pinMode(pump, OUTPUT);
}

void loop() {
  // Normally Open configuration, send LOW signal to let current flow
  // (if you're usong Normally Closed configuration send HIGH signal)
  digitalWrite(fan, LOW);
  digitalWrite(pump, LOW);
  Serial.println("Current Flowing");
  delay(5000); 
  
  // Normally Open configuration, send HIGH signal stop current flow
  // (if you're usong Normally Closed configuration send LOW signal)
  digitalWrite(fan, HIGH);
  digitalWrite(pump, HIGH);
  Serial.println("Current not Flowing");
  delay(5000);
}

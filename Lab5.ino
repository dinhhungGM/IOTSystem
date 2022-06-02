// ---------------------------------------------------------------- //
// Arduino Ultrasoninc Sensor HC-SR04
// Re-writed by Arbi Abdul Jabbaar
// Using Arduino IDE 1.8.7
// Using HC-SR04 Module
// Tested on 17 September 2019
// ---------------------------------------------------------------- //
#include <Wire.h>
#include <BH1750.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#include <ESP8266HTTPClient.h>
#define SERVER_IP "172.31.250.58:3000" 
#define STASSID "UiTiOt-E3.1"
#define STAPSK  "UiTiOtAP"
#define MSG_BUFFER_SIZE  (50)
const char* mqtt_server = "172.31.250.58";
const char* ledTopic = "LED";
#define DHTPIN D3
#define DHTTYPE DHT22
#define LED1 D6
#define LED2 D7
WiFiClient espClient;
DHT dht(DHTPIN, DHTTYPE);
PubSubClient client(espClient);
char msg[MSG_BUFFER_SIZE];
// defines variables
BH1750 lightMeter;
bool error = true;
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0]=='1' ) {
    if((char)payload[2] == '1')
      {
        digitalWrite(LED1, HIGH);
      }
    else
      {
        digitalWrite(LED1, LOW);
      }
    
  } else {
     if((char)payload[2] == '1')
      {
        digitalWrite(LED2, HIGH);
      }
    else
      {
        digitalWrite(LED2, LOW);
      }
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe(ledTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(1000);
    }
  }
}

void setup() {
  pinMode(LED1,OUTPUT);// Sets the echoPin as an INPUT  
  pinMode(LED2,OUTPUT);
  dht.begin();
  Serial.begin(9600); // // Serial Communication is starting with 9600 of baudrate speed
  Serial.println("with Arduino UNO R3");
  Wire.begin();
  lightMeter.begin();
  Serial.println("Running...");
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  WiFi.begin(STASSID, STAPSK);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
  
}
void loop() {
   if (!client.connected()) {
    reconnect();
  }
  client.loop();
  uint16_t lux = lightMeter.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(f);
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;
    
    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    String serverPath = SERVER_IP;
    http.begin(client, "http://" SERVER_IP "/sensor"); //HTTP
    http.addHeader("Content-Type", "application/json");
    Serial.print("[HTTP] POST...\n");
    // start connection and send HTTP header and body
    String httpRequestData = "{"
      "\"error\":\"true\","
      "\"message\":\"this is a message of API\","
      "\"data\":" 
        "{\"Light\":\"" + String(lux) + "\",\"Humidity\":\"" + String(h) + "\",\"Temperature\":\"" + String(t)+"\",\"deviceID\":\"" +  String(ESP.getChipId(),HEX)+"\",\"device_Name\":\"" + "Wemos D1" + "\"}"
    "}";
    int httpCode = http.POST(httpRequestData);
    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  }
  delay(500);
}

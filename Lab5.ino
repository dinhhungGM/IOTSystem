#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"


#define LED1 D1
#define LED2 D2
#define DHTPIN D3 
#define DHTTYPE DHT11


// WiFi
const char *ssid = "UiTiOt-E3.1"; // Enter your WiFi name
const char *password = "UiTiOtAP";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "test.mosquitto.org";
const char *led_topic = "wemos_d1/led";
const char *dht_temp_topic = "wemos_d1/temp";
const char *dht_humidity_topic = "wemos_d1/humidity";
const unsigned int mqtt_port = 1883;

// DHT
DHT dht(DHTPIN, DHTTYPE);

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi connected - ESP IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
     /*
     YOU  NEED TO CHANGE THIS NEXT LINE, IF YOU'RE HAVING PROBLEMS WITH MQTT MULTIPLE CONNECTIONS
     To change the ESP device ID, you will have to give a unique name to the ESP8266.
     Here's how it looks like now:
       if (client.connect("ESP8266Client")) {
     If you want more devices connected to the MQTT broker, you can do it like this:
       if (client.connect("ESPOffice")) {
     Then, for the other ESP:
       if (client.connect("ESPGarage")) {
      That should solve your MQTT multiple connections problem

     THE SECTION IN loop() function should match your device name
    */
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");  
      // Subscribe or resubscribe to a topic
      // You can subscribe to more topics (to control more LEDs in this example)
      client.subscribe(led_topic);
      client.subscribe(dht_temp_topic);
      client.subscribe(dht_humidity_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}


void callback(String topic, byte* message, unsigned int length) {
    Serial.print("Message arrived on topic: ");
    Serial.print(topic);
    Serial.print(". Message: ");
    String messageTemp;
    
    for (int i = 0; i < length; i++) {
      Serial.print((char)message[i]);
      messageTemp += (char)message[i];
    }
    Serial.println();

    if(topic == led_topic) {
      Serial.println(messageTemp);
      if (messageTemp == "led1_on") { digitalWrite(LED1, HIGH); }   // LED1 on
      if (messageTemp == "led1_off") { digitalWrite(LED1, LOW); } // LED1 off
      if (messageTemp == "led2_on") { digitalWrite(LED2, HIGH); }   // LED2 on
      if (messageTemp == "led2_off") { digitalWrite(LED2, LOW); } // LED2 off
      Serial.println();
      Serial.println("-----------------------");  
    }
}


void setup() {
  
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  dht.begin();

   // Set software serial baud to 115200;
  Serial.begin(115200);
  setup_wifi();
    //connecting to a mqtt broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  
  client.subscribe(led_topic);
  client.subscribe(dht_temp_topic);
  client.subscribe(dht_humidity_topic);
}

void loop() {
//   delay(2000);
//   float h = dht.readHumidity();
//   // Reading temperature or humidity takes about 250 milliseconds!
//   float t = dht.readTemperature();
//   
//   if (isnan(h) || isnan(t) ) {
//      Serial.println("Failed to read from DHT sensor!");
//      
//   }
//   
//   Serial.print ("Humidity: ");
//   Serial.print (h);
//   Serial.print (" %\t");
//   Serial.print ("Temperature: ");
//   Serial.print (t);
//   Serial.print (" *C ");
  if (!client.connected()) {
    reconnect();
  }
  if(!client.loop())
    client.connect("ESP8266Client");
}

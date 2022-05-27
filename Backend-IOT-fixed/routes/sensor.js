const express = require("express");
const router = express.Router();
const sensor = require("../model/sensorValue");
const verifyToken = require("../middleware/auth");
var value;
var deviceState = false;
router.post("/", async (req, res) => {
  value = req.body.data
  deviceState = true
  const date = new Date().toLocaleDateString()
  const { deviceID, device_Name,Light,Humidity,Temperature } = req.body.data
  try 
  {
        const values = await sensor.find()
        const valuePTerperature = values[values.length-1]
        const valuePLight = values[values.length-3]
        const valuePHumidity = values[values.length-2]
        // const isChange = Object.entries(value).toString() === Object.entries(valueP).toString() //Find the changing of value
          if(!valuePTerperature || (valuePTerperature.Value-value.Temperature > 5 || value.Temperature - valuePTerperature.Value >5) || 
          (valuePLight.Value-value.Light > 100 || value.Light - valuePLight.Value >100) || 
          (valuePHumidity.Value-value.Humidity > 10 || value.Humidity - valuePHumidity.Value > 10))
          {
            let Sensor = new sensor({
              deviceID,
              device_Name,
              Sensor: "Light",
              Value: Light,
              Time: date,
            });
            await Sensor.save();
            Sensor = new sensor({
              deviceID,
              device_Name,
              Sensor: "Humidity",
              Value: Humidity,
              Time: date,
            });
            await Sensor.save();
            Sensor = new sensor({
              deviceID,
              device_Name,
              Sensor: "Temperature",
              Value: Temperature,
              Time: date,
            });
            await Sensor.save()
            res.status(200).json({ success: true })
          }
        else
        {
          res.status(200).json({ success: true })
        }
        
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ success: false })
  }
});


//Get all sensors value
router.get("/getAll", verifyToken, async (req, res) => {
  const sensorValues = await sensor.find();
  res.json(sensorValues);
});


//Get current sensor value
router.get("/", async (req, res) => {
  if(!deviceState)
  {
    value={message:"No device connected"}
    res.json({ value, state: deviceState });
  }
  else{
    res.json({ value, state: deviceState });
    deviceState = false;
  }
  
});

module.exports = router;

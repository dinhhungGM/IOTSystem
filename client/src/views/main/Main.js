import { CRow } from '@coreui/react'
import axios from 'axios'
import React from 'react'
import WidgetsDropdownForMain from '../widgets/WidgetsDropdownForMain'
const mqtt = require('precompiled-mqtt')
const client = mqtt.connect('ws://172.31.250.193:9001/ws')
client.on('connect', function () {
  client.subscribe('test', function (err) {
    if (!err) {
      client.publish('test', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})

const Main = () => {
  const [checked1, setChecked1] = React.useState(false)
  const [checked2, setChecked2] = React.useState(false)
  const [lightState1, setText1] = React.useState('LED 1 is OFF')
  const [lightState2, setText2] = React.useState('LED 2 is OFF')
  const handleChange1 = (event1) => {
    console.log(checked1)
    console.log(event1.target.checked)
    if (event1.target.checked === false) {
      axios.post('http://172.31.250.209:4000/api/led', {
        value: '1-0',
      })
      setText1('LED 1  is OFF')
    } else if (event1.target.checked === true) {
      axios.post('http://172.31.250.209:4000/api/led', {
        value: '1-1',
      })
      setText1('LED 1 is ON')
      console.log(0)
    }
    setChecked1(event1.target.checked)
  }
  const handleChange2 = (event2) => {
    console.log(checked1)
    console.log(event2.target.checked)
    if (event2.target.checked === false) {
      axios.post('http://172.31.250.209:4000/api/led', {
        value: '2-0',
      })
      setText2('LED 2  is OFF')
    } else if (event2.target.checked === true) {
      axios.post('http://172.31.250.209:4000/api/led', {
        value: '2-1',
      })
      setText2('LED 2 is ON')
      console.log(0)
    }
    setChecked2(event2.target.checked)
  }

  return (
    <>
      <WidgetsDropdownForMain />
      <CRow className="d-flex px-2">
        <div className="form-check form-switch form-switch-lg">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={checked1}
            name="LED1"
            onChange={handleChange1}
          />
          <label className="px-2 form-check-label h5" htmlFor="flexSwitchCheckDefault">
            {String(lightState1)}
          </label>
        </div>
      </CRow>
      <CRow className="d-flex px-2">
        <div className="form-check form-switch form-switch-lg">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={checked2}
            name="LED2"
            onChange={handleChange2}
          />
          <label className="px-2 form-check-label h5" htmlFor="flexSwitchCheckDefault">
            {String(lightState2)}
          </label>
        </div>
      </CRow>
    </>
  )
}

export default Main

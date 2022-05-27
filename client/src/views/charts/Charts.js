import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Charts = () => {
  const [logs, setlogs] = useState([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/sensor/getAll')
        setlogs(response.data)
      } catch (err) {
        console.log(`Error: $(err.message)`)
      }
    }

    fetchLogs()
  }, [])

  const temperature = logs.filter((log) => log.Sensor === 'Temperature').map((log) => log.Value)
  const humidity = logs.filter((log) => log.Sensor === 'Humidity').map((log) => log.Value)
  const light = logs.filter((log) => log.Sensor === 'Light').map((log) => log.Value)

  const random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + n.slice(0, 6)
  }

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Temperature</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: temperature,
                datasets: [
                  {
                    label: 'độ C',
                    backgroundColor: random_hex_color_code(),
                    data: temperature,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Light</CCardHeader>
          <CCardBody>
            <CChartLine
              data={{
                labels: light,
                datasets: [
                  {
                    label: 'flux',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: light,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Humidity</CCardHeader>
          <CCardBody>
            <CChartPie
              data={{
                labels: humidity,
                datasets: [
                  {
                    data: humidity,
                    backgroundColor: humidity.map((log) => random_hex_color_code()),
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts

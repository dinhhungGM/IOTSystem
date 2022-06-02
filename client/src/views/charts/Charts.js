import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js'

import { Line, Pie, Bar } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
)

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

  // Line chart

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 20,
            weight: 'bold',
          },
          color: 'black',
        },
      },
      title: {
        display: true,
        text: 'Overview',
        color: '#2f4bc7',
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black',
        },
      },
      y: {
        // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 300,
        ticks: {
          color: 'black',
        },
      },
    },
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  const data = {
    labels,
    datasets: [
      {
        label: 'Cảm biến ánh sáng',
        data: [50, 100, 200, 70, 150, 6000, 65000],
        borderColor: 'rgb(96 165 250)',
        backgroundColor: 'rgb(96 165 250)',
        fill: false,
      },
    ],
  }

  // Pie chart
  const pieOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 20,
            weight: 'bold',
          },
          color: 'black',
        },
      },
      title: {
        display: true,
        text: 'Overview',
        color: '#2f4bc7',
      },
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.dat
          console.log(datasets)

          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a, b) => a + b, 0)
            let percentage = Math.round((value / sum) * 100) + '%'
            return percentage
          } else {
            return 5 + '%'
          }
        },
        color: 'red',
      },
    },
    legend: {
      display: false,
      position: 'center',
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  }

  const dataPieChart = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [150, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  }

  // Bar chart

  const OptionBarChart = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 20,
            weight: 'bold',
          },
          color: 'black',
        },
      },
      title: {
        display: true,
        text: 'Overview',
        color: '#2f4bc7',
      },
    },
  }

  const dataBarChart = {
    labels,
    datasets: [
      {
        label: 'Cảm biến nhiệt độ',
        data: [50, 30, 80, 60, 70, 80],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <CRow>
      {/* Line chart */}

      <CCol xs={6}>
        <CCard className="mb-4">
          <Line options={options} data={data} width={100} height={100} />
        </CCard>
      </CCol>

      <CCol xs={6}>
        <CCard className="mb-4">
          <Bar options={OptionBarChart} data={dataBarChart} width={100} height={100} />
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <Pie options={pieOptions} data={dataPieChart} width={100} height={100} />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts

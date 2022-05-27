import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Logs = () => {
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

  return (
    <>
      <CTable striped className="border">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID Thiết bị</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tên thiết bị</CTableHeaderCell>
            <CTableHeaderCell scope="col">Cảm biến</CTableHeaderCell>
            <CTableHeaderCell scope="col">Giá trị</CTableHeaderCell>
            <CTableHeaderCell scope="col">Thời gian</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {logs.reverse().map((log) => {
            return (
              <CTableRow key={log._id}>
                <CTableHeaderCell scope="row">{log.deviceID}</CTableHeaderCell>
                <CTableDataCell>{log.device_Name}</CTableDataCell>
                <CTableDataCell>{log.Sensor}</CTableDataCell>
                <CTableDataCell>{log.Value}</CTableDataCell>
                <CTableDataCell>{log.Time}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Logs

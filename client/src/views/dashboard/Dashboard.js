import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [state, setState] = useState('')
  useEffect(() => {
    const interval = setInterval(() => {
      const fetchState = async () => {
        try {
          const response = await axios.get('/sensor/')
          setState(response.data.state)
        } catch (err) {
          // console.log(Error: $(err.message))
        }
      }

      fetchState()
      console.log(state)
    }, 3000)

    return () => clearInterval(interval)
  })

  return (
    <>
      <CCard color="primary" textColor="white" className="mb-4">
        <CCardHeader>Dashboard</CCardHeader>
        <CCardBody>
          <CCardTitle>Lab 5</CCardTitle>
          <CCardText className="p-0 m-0">Thành viên nhóm:</CCardText>
          <CCardText className="p-0 m-0">Lâm Lê Đình Khang - 18520885</CCardText>
          <CCardText className="p-0 m-0">Đinh Xuân Hùng - 18520791</CCardText>
          <CCardText className="p-0 m-0">Lê Trần Bảo Nam - 18521123</CCardText>
        </CCardBody>
      </CCard>
      <CCard style={{ width: '18rem' }}>
        <CCardBody>
          <CCardTitle>Wemos D1</CCardTitle>
          {state ? (
            <CCardText className="fw-bold text-success">Active</CCardText>
          ) : (
            <CCardText className="fw-bold text-danger">Deactive</CCardText>
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard

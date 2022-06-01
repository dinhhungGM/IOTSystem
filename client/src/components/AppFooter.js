import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Xuân Hùng, Đình Khang, Bảo Nam
        </a>
        <span className="ms-1">&copy; 2022 IOT.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Co-founder by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          Xuân Hùng, Đình Khang, Bảo Nam
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

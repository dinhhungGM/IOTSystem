import { cilSpeedometer } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Main',
    to: '/main',
    icon: <CIcon customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Logs',
    to: '/logs  ',
    icon: <CIcon customClassName="nav-icon" />,
  },
]

export default _nav

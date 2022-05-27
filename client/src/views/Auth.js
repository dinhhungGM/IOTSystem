import React from 'react'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext)

  let body

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    )
  else if (isAuthenticated) return <Navigate to="/dashboard" />
  else
    body = (
      <>
        {authRoute === 'login' && <Login />}
        {authRoute === 'register' && <Register />}
      </>
    )

  return <>{body}</>
}

export default Auth

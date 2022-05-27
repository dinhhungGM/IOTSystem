import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext)

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    )

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute

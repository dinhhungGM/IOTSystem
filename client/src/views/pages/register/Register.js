import React, { useContext, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { AuthContext } from 'src/contexts/AuthContext'
import AlertMessage from 'src/views/notifications/alerts/AlertMessage'

const Register = () => {
  // Context
  const { registerUser } = useContext(AuthContext)

  // Local state
  const [registerForm, setRegisterForm] = useState({
    Name: '',
    userName: '',
    password: '',
    confirmPassword: '',
  })

  const [alert, setAlert] = useState(null)

  const { Name, userName, password, confirmPassword } = registerForm

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    })

  const register = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match' })
      setTimeout(() => setAlert(null), 5000)
      return
    }

    try {
      const registerData = await registerUser(registerForm)
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message })
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm className="form" onSubmit={register}>
                  <AlertMessage info={alert} />
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      autoComplete="Name"
                      name="Name"
                      value={Name}
                      onChange={onChangeRegisterForm}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="userName"
                      name="userName"
                      value={userName}
                      onChange={onChangeRegisterForm}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      value={password}
                      onChange={onChangeRegisterForm}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={onChangeRegisterForm}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

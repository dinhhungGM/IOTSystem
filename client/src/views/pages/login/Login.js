import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from 'src/contexts/AuthContext'
import AlertMessage from 'src/views/notifications/alerts/AlertMessage'

const Login = () => {
  // Context
  const { loginUser } = useContext(AuthContext)

  // Local state
  const [loginForm, setLoginForm] = useState({
    userName: '',
    password: '',
  })

  const [alert, setAlert] = useState(null)

  const { userName, password } = loginForm

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

  const login = async (event) => {
    event.preventDefault()

    try {
      const loginData = await loginUser(loginForm)
      if (!loginData.success) {
        setAlert({ type: 'danger', message: loginData.message })
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
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className="form" onSubmit={login}>
                    <AlertMessage info={alert} />
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="userName"
                        value={userName}
                        onChange={onChangeLoginForm}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={password}
                        onChange={onChangeLoginForm}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          className="px-4"
                          style={{ background: '#32c2d6', border: '1px solid #32c2d6' }}
                        >
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white  py-5" style={{ width: '44%', background: '#55cdde' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p> */}
                    <Link to="/register">
                      <CButton
                        className="mt-3"
                        active
                        tabIndex={-1}
                        style={{ background: '#32c2d6', border: '1px solid #169db0' }}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

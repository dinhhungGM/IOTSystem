import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import './scss/style.scss'
import Auth from './views/Auth'
import ProtectedRoute from './components/routing/ProtectedRoute'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Auth authRoute="login" />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              element={<Auth authRoute="register" />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="*"
              name="Home"
              element={
                <ProtectedRoute>
                  <DefaultLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App

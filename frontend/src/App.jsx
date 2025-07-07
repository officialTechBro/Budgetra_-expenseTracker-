import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Dashboard from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/userContext'

import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
   <UserProvider>
     <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login'  element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Routes>
      </Router>
    </div>

    <Toaster 
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px"
          }
        }}
    />
   </UserProvider>
  )
}
export default App

const Root = () => {
  // Check if token exist in LocalStorage
  const isAuthenticated = !!localStorage.getItem("token")

  // Redirect to dashboard if authenticated, otherwise Login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}
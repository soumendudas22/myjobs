
import './App.css'

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/PostJob';
import AuthProvider from './contexts/AuthProvider';
import Home from './pages/Home';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/resetpassword/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/postjob"
              element={<PostJob />}
            />
            {/* <Route exact path="/" render={() => (<Redirect to="/home" />)} /> */}
            {/* <Route path="" component={NotFound} /> */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App

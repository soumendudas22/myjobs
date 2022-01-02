import './style.css';
import { BsFillCaretDownFill } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "./../../contexts/AuthProvider";

function Dropdown() {
  const auth = useAuth();
  const clear = () => {
    localStorage.clear();
    auth.setUser(null);
  }
  return (
    <div className="dropdown">
      <div className="caret">
      </div>
      <Link to="/" onClick={() => clear()} style={{ textDecoration: 'none', fontSize: 14 }}>Logout</Link>
    </div>
  )
}

function Navbar({ isLoginSignupPage = false }) {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = useAuth();

  const toggle = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    if (auth?.user?.token) setShow(true);
  }, [show]);

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <Link to="/dashboard" className="navbar-logo" style={{ textDecoration: 'none' }}>My<span style={{ color: "var(--blue-200)" }}>Jobs</span></Link>
        <div className="navbar-links">
          {show && <Link to="/postjob" id="post-job">Post a Job</Link>}
          {show && <div id="avatar">{auth?.user?.name[0]}</div>}
          {show && <div id="nav-dropdown" onClick={() => toggle()}>
            <BsFillCaretDownFill color='white' />
          </div>}
          {showDropdown && <Dropdown />}
          {(!show && !isLoginSignupPage) && <Link to="/login"><button id="login-signup-btn">Login/Signup</button></Link>}
        </div>
      </div>
    </div>
  )
}

export default Navbar

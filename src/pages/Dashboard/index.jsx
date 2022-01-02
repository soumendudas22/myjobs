import React, { useEffect } from 'react'
import { useAuth } from './../../contexts/AuthProvider';
import Navbar from '../../components/Navbar';
import { useNavigate, Link } from 'react-router-dom'
import { AiFillHome } from "react-icons/ai";
import { IoReader } from "react-icons/io5";
import { SERVICE } from "./../../util/api";
import JobCard from '../../components/JobCard';
import Pagination from '../../components/Pagination';
import './style.css'

function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);

  useEffect(() => {
    if (auth.user == null) {
      navigate('/');
    } else {
      SERVICE.GET_JOBS_POSTED({ token: auth.user.token })
        .then(res => {
          if(res.success) {
            setJobs([...res.data.data]);
          }
        })
    }
  }, [])

  return (
    <div>
      <Navbar isLoginSignupPage={false} />
      <div className='login-wrapper'>
        <div className="login-dark-background" style={{ height: 140 }}></div>
        <div className="dahboard-wrapper">
          <div className="location-track">
            <Link to="/dashboard" className='locaiton-item'><AiFillHome style={{ marginRight: 5 }} />Home</Link>
          </div>
          <div className="dashboard-title">Jobs posted by you</div>
          {
            jobs.length !== 0 ? (
                <Pagination data={jobs} RenderComponent={JobCard} title="Jobs posted by you" pageLimit={1} dataLimit={8} />
            ) : (
              <div className="no-job-wrapper">
                <IoReader style={{ fontSize: 155, color: 'var(--grey-200)' }} />
                <div className="no-job-text">Your posted jobs will show here!</div>
                <button className="form-button" type="submit" style={{ marginTop: 40 }}>Post a Job</button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard

import React from 'react'
import Navbar from '../../components/Navbar'
import './style.css'
import girlImg from './../../assets/imgs/girl_laptop.jpg'

function Card({ title, description }) {
  return (
    <div className="home-card">
      <div className="home-card-title">{title}</div>
      <div className="home-card-desc">{description}</div>
    </div>
  )
}

function Home() {
  return (
    <div>
      <Navbar />
      <div className='login-wrapper'>
        <div className="login-dark-background" style={{ height: 350 }}></div>
        <div className="top-section">
          <div className="left-top">
            <span>Welcome to </span><span to="/dashboard" className="home-logo" style={{ textDecoration: 'none' }}>My<span style={{ color: "var(--blue-200)" }}>Jobs</span></span>
            <button className="form-button" type="button">Get Started</button>
          </div>
          <div className="right-top">
            <img src={girlImg} alt="" width={542} height={355} style={{ borderRadius: 20 }} />
          </div>
        </div>
        <div className="middle-section">
          <div className="middle-title">
            Why us
          </div>
          <div className="middle-cards" >
            <Card title="Get more visibility" description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ratione, expedita laborum delectus repellendus maiores? Esse perferendis minima iste expedita."/>
            <Card title="Organize your candidates" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
            <Card title="Verify their abilities" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."/>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Home

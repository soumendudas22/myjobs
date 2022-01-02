import React, { useEffect, useState } from 'react'
import './style.css'
import { useForm } from "react-hook-form";
import { SERVICE } from "./../../util/api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import { useAuth } from './../../contexts/AuthProvider';

function Login() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');
  const auth = useAuth();

  useEffect(() => {
    if(auth?.user!==null) {
      navigate('/dashboard');
    } else {
      const data = JSON.parse(localStorage.getItem('data'));
      if(data?.token) {
        auth.setUser(data);
        navigate('/dashboard');
      }
    }
  } , [])


  const onSubmit = data => {
    SERVICE.LOGIN(data).then(res => {
      if (!res.success) {
        if (res.code === 401) setSubmitError(res.message);
      } else {
        setSubmitError('');
        const { token, name } = res.data;
        localStorage.setItem('data', JSON.stringify({ token, name }));
        auth.setUser(res.data);
        navigate('/dashboard');
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      reset();
    });
  };

  return (
    <>
      <Navbar isLoginSignupPage={true}/>
      <div className='login-wrapper'>
        <div className="login-dark-background"></div>
        <div className="login-box">
          <div className="form-heading">Login</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-title">Email address</div>
              <input className={`form-input ${errors.email && 'error-input'}`} placeholder="Enter your email" type="text" {...register('email', { required: true })} />
              {errors.email && <div className="form-error">This field is required</div>}
            </div>
            <div className="form-group">
              <div className="form-title">Password</div>
              <Link to="/forgotpassword" className="form-help">Forgot your password?</Link>
              <input className={`form-input ${errors.password && 'error-input'}`} placeholder="Enter your password" type="password" {...register('password', { required: true })} />
              {errors.password && <div className="form-error">This field is required</div>}
              {!errors.password && submitError !== '' && <div className="form-error">{submitError}</div>}
            </div>
            <button className="form-button" type="submit">Login</button>
          </form>
          <div style={{ marginTop: 35 }}>New to MyJobs? <Link to="/signup" style={{ color: 'var(--blue-200)', cursor: 'pointer', textDecoration: 'none' }}>Create an account</Link></div>
        </div>
      </div>
    </>
  )
}

export default Login
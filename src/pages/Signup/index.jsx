import React, { useEffect, useState } from 'react'
import { MdPersonSearch } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { useForm } from "react-hook-form";
import { SERVICE } from "./../../util/api";
import { format } from "./../../util/errorFormat";
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthProvider';

import './style.css'

function Signup() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [submitErrors, setSubmitErrors] = useState({});
  const [submitErrorMsg, setSubmitErrorMsg] = useState('');
  const [isCandidate, setIsCandidate] = useState(false);
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
  }, []);

  const onSubmit = data => {
    SERVICE.SIGNUP({ ...data, userRole: isCandidate ? 1 : 0 }).then(res => {
      if (!res.success) {
        if (res.code === 422 && Object.keys(res).includes('message')) {
          setSubmitErrorMsg(res.message);
        } else {
          setSubmitErrors(format(res.errors));
        }
      } else {
        setSubmitErrors({});
        setSubmitErrorMsg('');
        reset();
        // redirect to job portal
        navigate('/login');
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <>
      <Navbar isLoginSignupPage={true}/>
      <div className='sigup-wrapper'>
        <div className="sigup-dark-background"></div>
        <div className="sigup-box">
          <div className="form-heading">Signup</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-title">I'm a<sup>*</sup></div>
              <div style={{ display: 'flex' }}>
                <button
                  className="form-button signup-radio-btn"
                  type="button"
                  style={!isCandidate ? { backgroundColor: 'var(--blue-200)' } : { backgroundColor: 'var(--grey-100)', color: 'var(--blue-500)', border: '1px solid var(--grey-200)' }}
                  onClick={() => setIsCandidate(false)}
                >
                  <MdPersonSearch style={{ fontSize: 18 }} color={!isCandidate ? 'white' : 'var(--blue-200)'} />Recruter
                </button>
                <button
                  disabled
                  className="signup-radio-btn"
                  type="button"
                  style={{ border: '1px solid var(--grey-200)' }}
                  onClick={() => setIsCandidate(true)}
                >
                  <IoIosPeople style={{ fontSize: 18 }} color={isCandidate ? 'white' : 'var(--blue-200)'} /> Candidate
                </button>
              </div>
              {submitErrors?.userRole && <div className="form-error">{submitErrors.userRole}</div>}
            </div>
            <div className="form-group">
              <div className="form-title">Full Name<sup>*</sup></div>
              <input className="form-input" placeholder="Enter your full name" type="text" {...register('name', { required: true })} />
              {errors.name && <div className="form-error">This field is mandatory.</div>}
              {!errors.name && submitErrors?.name && <div className="form-error">{submitErrors.name}</div>}
            </div>
            <div className="form-group">
              <div className="form-title">Email Address<sup>*</sup></div>
              <input className="form-input" placeholder="Enter your email" type="text" {...register('email', { required: true })} />
              {errors.email && <div className="form-error">This field is mandatory.</div>}
              {!errors.email && submitErrors?.email && <div className="form-error">{submitErrors.email}</div>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 30px', position: 'relative' }}>
              <div className="form-group" style={{ padding: 0 }}>
                <div className="form-title">Password<sup>*</sup></div>
                <input className="form-input" placeholder="Enter your password" type="password" style={{ width: '200px' }} {...register('password', { required: true })} />
                {errors.password && <div className="form-error">This field is mandatory.</div>}
              </div>
              <div className="form-group" style={{ padding: 0 }}>
                <div className="form-title">Confirm Password<sup>*</sup></div>
                <input className="form-input" placeholder="Enter your password" type="password" style={{ width: '200px' }} {...register('confirmPassword', { required: true })} />
                {errors.confirmPassword && <div className="form-error">This field is mandatory.</div>}
              </div>
              {!errors.password && !errors.confirmPassword && submitErrors?.password && <div className="form-error" style={{ bottom: 0 }}>{submitErrors.password}</div>}
            </div>
            <div className="form-group">
              <div className="form-title">Skills</div>
              <input className="form-input" placeholder="Enter comma separated skills" type="text" {...register('skills')} />
              {submitErrorMsg && <div className="form-error">{submitErrorMsg}</div>}
            </div>
            <button className="form-button" type="submit">Signup</button>
          </form>
          <div style={{ marginTop: 35 }}>Have an account? <Link to="/login" style={{ color: 'var(--blue-200)', cursor: 'pointer', textDecoration: 'none' }}>Login</Link></div>
        </div>
      </div>
    </>
  )
}

export default Signup
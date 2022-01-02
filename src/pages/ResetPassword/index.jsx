import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { SERVICE } from "./../../util/api";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../../components/Navbar';

function ResetPassword() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [submitError, setSubmitError] = useState('');

  const onSubmit = data => {
    SERVICE.VERIFY_PASSWORD_TOKEN({ token: params.token }).then(res => {
      if (res.success) {
        SERVICE.CHANGE_PASSWORD({ ...data, token: params.token }).then(res => {
          if (res.success) {
            navigate('/login');
            reset();
          }
          else setSubmitError(res.message);
        }).catch(err => {
          console.log(err);
        });
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <>
      <Navbar />
      <div className='login-wrapper'>
        <div className="login-dark-background"></div>
        <div className="login-box" style={{ height: 408 }}>
          <div className="form-heading" style={{ marginBottom: 20 }}>Reset Your Password</div>
          <div className="form-title" style={{ marginBottom: 30, padding: '0 30px' }}>Enter your new password below.</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-title">New password</div>
              <input className={`form-input ${errors.password && 'error-input'}`} placeholder="Enter your password" type="password" {...register('password', { required: true })} />
              {errors.password && <div className="form-error" style={{ bottom: -20 }}>This field is mandatory.</div>}
            </div>
            <div className="form-group">
              <div className="form-title">Confirm new password</div>
              <input className={`form-input ${errors.confirmPassword && 'error-input'}`} placeholder="Enter your password" type="password" {...register('confirmPassword', { required: true })} />
              {errors.confirmPassword && <div className="form-error" style={{ bottom: -20 }}>This field is mandatory.</div>}
              {submitError && <div className="form-error" style={{ bottom: -30, textAlign: 'end' }}>{submitError}</div>}
            </div>
            <button className="form-button" type="submit">Reset</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
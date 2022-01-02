import React from 'react'
import { useForm } from "react-hook-form";
import { SERVICE } from "./../../util/api";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';

function ForgotPassword() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    SERVICE.RESET_PASSWORD_TOKEN(data).then(res => {
      if (res.success) navigate(`/resetpassword/${res.data.token}`);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      reset();
    });
  };

  return (
    <>
      <Navbar />
      <div className='login-wrapper'>
        <div className="login-dark-background"></div>
        <div className="login-box" style={{ height: 318 }}>
          <div className="form-heading" style={{ marginBottom: 20 }}>Forgot your password?</div>
          <div className="form-title" style={{ marginBottom: 20, padding: '0 30px' }}>Enter the email associated with your account and we’ll send you instructions to reset your password.</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-title">Email address</div>
              <input className="form-input" placeholder="Enter your email" type="text" {...register('email', { required: true })} />
              {errors.email && <div className="form-error" style={{ bottom: -20 }}>This field is required</div>}
            </div>
            <button className="form-button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
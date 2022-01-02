import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useForm } from "react-hook-form";
import { SERVICE } from "./../../util/api";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineRight } from "react-icons/ai";
import { useAuth } from './../../contexts/AuthProvider';
import { format } from "./../../util/errorFormat";

function PostJob() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitErrors, setSubmitErrors] = useState([]);
  const auth = useAuth();

  const onSubmit = data => {
    console.log({ ...data, token: auth?.user?.token })
    SERVICE.JOB_POST({ ...data, token: auth?.user?.token }).then(res => {
      console.log(res);
      if (!res.success) {
        if (!(res.code === 422 && Object.keys(res).includes('message'))) {
          setSubmitErrors(format(res.errors));
        } 
      } 
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
        <div className="location-track" style={{ position: 'relative', margin: '0 152px', fontSize: 12, display: 'flex', alignItems: 'center', zIndex: 5, height: 15, flexDirection: 'row' }}>
          <Link to="/dashboard" className='locaiton-item'><AiFillHome style={{ marginRight: 5 }} />Home</Link>
          <AiOutlineRight className='locaiton-item'/>
          <Link to="/dashboard" className='locaiton-item'>Post a Job</Link>
        </div>
        <div className="login-dark-background"></div>
        <div className="login-box" style={{ height: 506 }}>
          <div className="form-heading">Post a Job</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-title">Job title<sup>*</sup></div>
              <input className={`form-input ${errors.title && 'error-input'}`} placeholder="Enter job title" type="text" {...register('title', { required: true })} />
              {errors.title && <div className="form-error">This field is required</div>}
              {!errors.title && submitErrors?.title && <div className="form-error">{submitErrors.title}</div>}
            </div>
            <div className="form-group">
              <div className="form-title">Description<sup>*</sup></div>
              <textarea cols="10" rows="20" className={`form-input ${errors.description && 'error-input'}`} placeholder="Enter job description" style={{ height: 70, paddingTop: 10 }} {...register('description', { required: true })}></textarea>
              {errors.description && <div className="form-error">This field is required</div>}
              {!errors.description && submitErrors?.description && <div className="form-error">{submitErrors.description}</div>}
            </div>
            <div className="form-group">
              <div className="form-title">Location<sup>*</sup></div>
              <input className={`form-input ${errors.location && 'error-input'}`} placeholder="Enter location" type="text" {...register('location', { required: true })} />
              {errors.location && <div className="form-error">This field is required</div>}
              {!errors.location && submitErrors?.location && <div className="form-error">{submitErrors.location}</div>}
            </div>
            <button className="form-button" type="submit">Post</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PostJob
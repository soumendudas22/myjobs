
import React from 'react'
import './style.css';
import { GrLocation } from "react-icons/gr";
import { AnimatePresence } from "framer-motion";
import Modal from '../Modal';

function JobCard({ job }) {
  const [open, setOpen] = React.useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className='card-wrapper'>
      <div className="job-title">{ job.title }</div>
      <div className="job-desc">{ job.description }</div>
      <div className="job-footer">
        <div className="job-location"> <GrLocation className='location-icon'/> { job.location }</div>
        <button 
          className="job-applicaitons" 
          onClick={() => (open ? closeModal() : openModal())}
        >View applications</button>
      </div>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {open && <Modal handleClose={closeModal} id={job.id} />}
      </AnimatePresence>
    </div>
  )
}

export default JobCard

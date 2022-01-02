import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Backdrop from "./../Backdrop";
import { SERVICE } from "../../util/api";
import { useAuth } from "../../contexts/AuthProvider";
import './style.css';
import { IoClose } from "react-icons/io5";
import { RiFileUserLine } from "react-icons/ri";
import CandidateCard from "../CandidateCard";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 3,
      type: 'spring',
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    y: "-100vh",
    opacity: 0
  }
}

export default function Modal({ handleClose, id }) {
  const [candidates, setCandidates] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    SERVICE.GET_ONE_JOB_CANDIDATES({ token: auth.user.token, id })
      .then(res => {
        if (res.success) {
          console.log(res);
          if (res?.message === "No candidates have applied for the job posting") setCandidates([]);
          else setCandidates([...res.data]);
        }
      })
  }, [])

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="modal-header">
          <div className="modal-title">Applicants for this job</div>
          <button onClick={handleClose} className="modal-close-btn"><IoClose style={{ fontSize: 16 }} /></button>
        </div>
        <div className="candidates-count">Total {candidates.length} applications</div>
        <div className="modal-body">
          {
            candidates.length > 0 ? <div className="modal-candidate-holder">
              {candidates.map(candidate => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div> : <div className="no-candidates">
              <RiFileUserLine style={{ fontSize: 150 }} />
              <div className="no-candidates-text">No applications available!</div>
            </div>
          }
        </div>
      </motion.div>
    </Backdrop>
  )
}
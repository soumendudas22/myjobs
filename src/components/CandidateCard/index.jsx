import React from 'react'
import './style.css'

function CandidateCard({ candidate }) {
  console.log(candidate)
  return (
    <div className='candidate-card-wrapper'>
      <div className="candidate-card-header">
        <div className="candidate-card-avatar">{candidate.name[0]}</div>
        <div>
          <div className="candidate-card-name">{candidate.name}</div>
          <div className="candidate-card-email">{candidate.email}</div>
        </div>
      </div>
      <div className="candidate-card-body">
        <div className="candidate-card-heading">Skills</div>
        <div className="candidate-card-skills">{candidate.skills}</div>
      </div>
    </div>
  )
}

export default CandidateCard

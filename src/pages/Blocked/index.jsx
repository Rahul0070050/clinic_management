import React from 'react'
import { useNavigate } from 'react-router-dom'

import './style.scss'

function Blocked() {
  const navigate = useNavigate()
  return (
    <div className='blocked-view'>
      <div className="container">
        <h1>
          Your Account has been blocked
        </h1>
        <button onClick={(e) => {
          if (window.location.pathname.startsWith('/doctor')) {
            navigate('/doctor/login')
            return false
          } else {
            navigate('/login')
            return false
          }
        }}>back to login</button>
      </div>
    </div>
  )
}

export default Blocked
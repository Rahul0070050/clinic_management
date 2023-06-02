import React from 'react'

import './style.scss'
import { useLocation } from 'react-router-dom'

function BookingsInfo() {
    const location = useLocation()
  return (
    <div>{location.state.id}</div>
  )
}

export default BookingsInfo
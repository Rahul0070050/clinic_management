import React, { useState } from 'react'

import doctorIcon from '../../../assets/images/doctor-icon-admin-status-card.png'
import patientIcon from '../../../assets/images/patients-icon-admin-status-card.png'
import bookingIcon from '../../../assets/images/booking-icon-admin-status.png'

// import patientIcon from '../../../assets/images/patients-icon-admin-status-card.png'
// import patientIcon from '../../../assets/images/patients-icon-admin-status-card.png'
// import patientIcon from '../../../assets/images/patients-icon-admin-status-card.png'

import './style.scss';

function StatusCard({ name, count }) {
    const [image, setImage] = useState(() => {
        switch (name) {
            case "users":
                return patientIcon
            case "patients":
                return patientIcon
            case "doctors":
                return doctorIcon
            case "department":
                return patientIcon
            case "Bookings":
                return bookingIcon
            default:
                return bookingIcon
        }
    })
    return (
        <div className='admin-status-card'>
            <div className="icon">
                <img src={image} alt="" />
            </div>
            <div className="info">
                <h1>{name}</h1>
                <h1>{count}</h1>
            </div>
        </div>
    )
}

export default StatusCard
import React from 'react'

import './style.scss';
import DoctorsList from '../../../components/userComponents/doctorSList';

function UserHome() {
  return (
    <div className='user-home'>
      <div className="user-home-section">
        <div className="user-home-banner">
          <img src="https://blog.digitalinfobytes.com/wp-content/uploads/2022/06/software-for-healthcare-organizations-scaled.jpg" alt="" />
        </div>
        <div className="user-home-texts">
          <div className="text">
            <h1>Welcome to Skin Care</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ea repellat at eos optio est modi magnam sunt culpa corporis, dolore</p>
            <a href='#'>Take an Appointment</a>
          </div>
        </div>
      </div>
      <div className="doctors-list-section">
        <div className="section-title">
          <h2>See Doctors</h2>
        </div>
        <DoctorsList />
      </div>
    </div>
  )
}

export default UserHome;
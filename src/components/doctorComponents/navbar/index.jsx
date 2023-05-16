import React, { useLayoutEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert'

import siteLogo from './../../../assets/svg/site-logo.svg'

import './style.scss'
import useFetch from '../../../hooks/useFetch'

const getRequest = useFetch("GET");
function DoctorNavBar() {
  const doctorToken = localStorage.getItem('doctor-token')

  function logoutHandler() {
    if (doctorToken) {
      swal({
        title: "Are you sure?",
        text: "Are you sure!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if(willDelete) {
            localStorage.removeItem('doctor-token')
            window.location = '/doctor/login'
          }
        });
    }
  }
  return (
    <nav className='doctor-navbar'>
      <div className="logo">
        <img src={siteLogo} alt="" />
        <span>Skin Care</span>
      </div>
      <ul>
        <li>
          <NavLink to="/doctor/home">Home</NavLink>
        </li>
        {doctorToken && <li>
          <NavLink to="/doctor/slots">Slots</NavLink>
        </li>}
        {doctorToken && <li>
          <NavLink to="/doctor/appointments">Appointments</NavLink>
        </li>}
        <li>
          <NavLink to="/doctor/patients">Patients</NavLink>
        </li>
        <li>
          {doctorToken ?
            <button onClick={logoutHandler}>LogOut</button>
            :
            <button onClick={() => window.location = '/doctor/login'}>Login</button>
          }
        </li>
      </ul>
    </nav >
  )

}

export default DoctorNavBar
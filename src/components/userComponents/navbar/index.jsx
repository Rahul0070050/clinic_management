import React, { useState } from 'react'
import swal from 'sweetalert'

import siteLogo from './../../../assets/svg/site-logo.svg'

import './style.scss'
import { NavLink } from 'react-router-dom'

function UserNavBar() {
  const userToken = localStorage.getItem('user-token')
  const [logedIn, setLogedIn] = useState(() => localStorage.getItem('user-token') ? true : false);

  function logoutHandler() {
    if (userToken) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            localStorage.removeItem('user-token')
            window.location = '/login'
          } else {
            //
          }
        });
    }
  }
  return (
    <nav>
      <div className="logo">
        <img src={siteLogo} alt="" />
        <span>Skin Care</span>
      </div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {logedIn && <li>
          <NavLink to="/appointment">Appointment</NavLink>
        </li>}
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/about-us">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/contact-us">Contact US</NavLink>
        </li>
        <li>
          {logedIn ?
            <button onClick={logoutHandler}>LogOut</button>
            :
            <button onClick={() => window.location = '/login'}>Login</button>
          }
        </li>
      </ul>
    </nav >
  )

}

export default UserNavBar
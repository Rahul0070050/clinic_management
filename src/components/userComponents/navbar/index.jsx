import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert'

import siteLogo from './../../../assets/svg/site-logo.svg'
import { userLogout } from '../../../store/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'

import './style.scss'

function UserNavBar() {
  const userToken = localStorage.getItem('user-token')
  const { login } = useSelector(state => state.root.user);
  console.log(login);
  const dispatch = useDispatch();

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
          dispatch(userLogout(willDelete))
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
        {login && <li>
          <NavLink to="/appointment">Appointment</NavLink>
        </li>}
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/about-us">About US</NavLink>
        </li>
        <li>
          <NavLink to="/contact-us">Contact US</NavLink>
        </li>
        <li>
          {login ?
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
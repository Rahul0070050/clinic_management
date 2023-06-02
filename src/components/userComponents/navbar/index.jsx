import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../../../store/slice/userSlice'

import siteLogo from './../../../assets/svg/site-logo.svg'
import menuIcon from './../../../assets/images/menu-icon.png'

import './style.scss'

function UserNavBar() {
  const userToken = localStorage.getItem('user-token')

  const { login } = useSelector(state => state.root.user);
  const dispatch = useDispatch();
  const [displayMenu, setDisplayMenu] = useState(false)

  function logoutHandler() {
    if (userToken) {
      swal({
        title: "Are you sure?",
        text: "Are you sure!",
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
    <nav className='user-navbar'>
      <div className="logo">
        <img src={siteLogo} alt="" />
        <span>Skin Care</span>
      </div>
      <ul className={displayMenu ? 'show-menu' : ''}>
        <li >
          <NavLink to="/" onClick={() => setDisplayMenu(false)}>Home</NavLink>
        </li>
        {login && <li>
          <NavLink to="/appointment" onClick={() => setDisplayMenu(false)}>Appointment</NavLink>
        </li>}
        <li>
          <NavLink to="/about-us" onClick={() => setDisplayMenu(false)}>About US</NavLink>
        </li>
        {login &&
          <>
            <li>
              <NavLink to="/Bookings" onClick={() => setDisplayMenu(false)}>Bookings</NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={() => setDisplayMenu(false)}>Profile</NavLink>
            </li>
          </>
        }
        <li>
          {userToken ?
            <button onClick={() => {
              logoutHandler()
              setDisplayMenu(false)
            }}>LogOut</button>
            :
            <button onClick={() => {
              window.location = '/login'
              setDisplayMenu(false)
            }}>Login</button>
          }
        </li>
      </ul>
      <img src={menuIcon} alt="" onClick={() => setDisplayMenu(!displayMenu)} className="menu" />
    </nav >
  )

}

export default UserNavBar
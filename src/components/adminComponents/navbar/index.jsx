import React from 'react'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'

import siteLogo from './../../../assets/svg/site-logo.svg'
import notificationIcon from './../../../assets/svg/notification-icon.svg'
import searchIcon from './../../../assets/svg/search-icon.svg'
import { search } from '../../../store/slice/adminSlice'
import './style.scss'

function AdminNavBar() {
  const userToken = localStorage.getItem('admin-token')
  const { login } = useSelector(state => state.root.user);
  const dispatch = useDispatch();

  function handleSearch() {
    let timer = null;

    return (word) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        dispatch(search(word))
      }, 300)
    }
  }
  let searchWord = handleSearch();

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

        });
    }
  }
  return (
    <nav className='admin-navbar'>
      <div className="top">
        <div className="hero-icon">
          <img src={siteLogo} alt="" />
          <h2>Skin Care</h2>
        </div>
        <div className="search">
          <input placeholder='search by name' onChange={(e) => searchWord(e.target.value)} type="text" name="" id="" />
          <img src={searchIcon} alt="" />
        </div>
        <div className="notification">
          <img src={notificationIcon} alt="" />
        </div>
      </div>
      <div className="bottom">
        <ul className='links'>
          <li><NavLink to={'/admin/dashboard'}>Dashboard</NavLink></li>
          <li><NavLink to={'/admin/appointments'}>Appointments</NavLink></li>
          <li><NavLink to={'/admin/doctors'}>Doctors</NavLink></li>
          <li><NavLink to={'/admin/departments'}>Departments</NavLink></li>
          {/* <li><NavLink to={'/admin/patients'}>Patients</NavLink></li> */}
          <li><NavLink to={'/admin/users'}>users</NavLink></li>
          <li><NavLink to={'/admin/payments'}>Payments</NavLink></li>
          {/* <li><NavLink to={'/admin/help'}>Help</NavLink></li> */}
        </ul>
      </div>
    </nav>
  )

}

export default AdminNavBar
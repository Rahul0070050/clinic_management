import React from 'react'
import swal from 'sweetalert'

import './style.scss'

function UserNavBar() {
  const userToken = localStorage.getItem('user-token')
  if (!userToken) {
    localStorage.removeItem('user-token')
    window.location = '/login'
  }
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
        Skin Care
      </div>
      <div className="links">
        <span>Help</span>
        <span>User</span>
        <span onClick={logoutHandler}>Logout</span>
      </div>
    </nav>)

}

export default UserNavBar
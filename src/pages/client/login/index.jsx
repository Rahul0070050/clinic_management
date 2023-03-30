import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/user-login-logo.png';
import openEye from '../../../assets/images/open-eye.png';
import closedEYe from '../../../assets/images/closed-eye.png';
import backGroundImage from '../../../assets/images/user-login-background.jpg'
import userLogo from '../../../assets/images/user-logo.png'
import passwordLogo from '../../../assets/images/password-icon.png'
import settings from '../../../assets/images/settings-icon.png'

import './style.scss';

function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" })
  const [userDataErr, setUserDataErr] = useState({ username: false, password: false })
  const [showPassword, setShowPassword] = useState(false)

  function handleOnchange(e) {
    setUserData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    setUserDataErr(prev => {
      return {
        ...prev,
        username: userData.username == "" ? true : false,
        password: userData.password == "" ? true : false
      }
    })
  }

  return (
    <div className='user-login'>
      <div className="login-container">
        <div className="banner">
          <img srcSet={settings} alt="" className="settings-icon" />
          <img className='banner-background-image' srcSet={backGroundImage} alt="" />
        </div>
        <div className="form-container">
          <h1 className="heading">
            <span>We Are Here </span>For You
          </h1>
          <p>iusto nemo sunt maxime aspernatur fugiat velit, minus assumenda corporis deleniti perferendis ut blanditiis dignissimos quos ducimus!</p>
          <form>
            <div className="form-control">
              <div className="icon">
                <img srcSet={userLogo} />
              </div>
              <div className="input-control">
                <span>{userDataErr.username ? "err" : ""}</span>
                <input placeholder='username' type="text" name="username" id="" value={userData.username} onChange={handleOnchange} />
              </div>
            </div>
            <div className="form-control">
              <div className="icon">
                <img srcSet={passwordLogo} />
              </div>
              <div className="input-control">
                <span>{userDataErr.password ? "err" : ""}</span>
                <input placeholder='password' type={showPassword ? "text" : "password"} name="password" id="" value={userData.password} onChange={handleOnchange} />
                <img className='password-visibility' onClick={() => setShowPassword(prev => !prev)} src={showPassword ? openEye : closedEYe} alt="" />
              </div>
            </div>
            <button onClick={handleSubmit}>submit</button>
            <div className="links">
              <a href="">forgot password</a>,&nbsp;&nbsp;
              {/* <Link to={"/signup"}>i don't have an account</Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
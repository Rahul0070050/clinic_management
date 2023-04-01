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
import useFetch from '../../../hooks/useFetch';

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [userDataErr, setUserDataErr] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState(null);

  const postRequest = useFetch("POST");


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
        email: userData.email == "" ? true : false,
        password: userData.password == "" ? true : false
      }
    })
    if(userData.email == "" || userData.password == "") {
      return;
    }

    if(userData.password.length < 8) {
      setErr(prev => "password should be at least 8 characters");
      return
    }
    console.log(userData);

    try {
      
      postRequest('/user/login',userData).then(res => {
        console.log(res);
        localStorage.setItem('user-token',JSON.stringify(res.token))
        navigate('/')
      }).catch(err => {
        setErr(prev => err)
      });
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='user-login'>
      <div className="login-container">
        {err && <div className='error-message'>{err}</div>}
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
                <input placeholder={userDataErr.email ? "please provide *email" : "email" } type="email" className={userDataErr.email ? 'err-color' : ''} name="email" id="" value={userData.email} onChange={handleOnchange} />
              </div>
            </div>
            <div className="form-control">
              <div className="icon">
                <img srcSet={passwordLogo} />
              </div>
              <div className="input-control">
                <input placeholder={userDataErr.email ? "please provide *password" : "password" } className={userDataErr.password ? 'err-color' : ''} type={showPassword ? "text" : "password"} name="password" id="" value={userData.password} onChange={handleOnchange} />
                <img className='password-visibility' onClick={() => setShowPassword(prev => !prev)} src={showPassword ? openEye : closedEYe} alt="" />
              </div>
            </div>
            <button onClick={handleSubmit}>submit</button>
            <div className="links">
              <a href="">forgot password</a>,&nbsp;&nbsp;
              <Link to={"/signup"}>i don't have an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
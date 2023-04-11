import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import useFetch from '../../../hooks/useFetch';

import logo from '../../../assets/images/user-login-logo.png';
import openEye from '../../../assets/images/open-eye.png';
import closedEYe from '../../../assets/images/closed-eye.png';
import backGroundImage from '../../../assets/images/user-login-background.jpg'
import userLogo from '../../../assets/images/user-logo.png'
import passwordLogo from '../../../assets/images/password-icon.png'
import sideImage from '../../../assets/svg/login-page-logo.svg'

import './style.scss';

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "", confirm_password: "" });
  const [userDataErr, setUserDataErr] = useState({ email: "", password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()
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

    if (userData.email == "" || userData.password == "" || userData.confirm_password == "") {
      for (const key in userData) {
        if (userData[key] == "") {
          setUserDataErr((prev) => {
            return {
              ...prev,
              [key]: "place provide " + key
            }
          })
        } else {
          setUserDataErr((prev) => {
            return {
              ...prev,
              [key]: ""
            }
          })
        }
      }
      return;
    }

    if (userData.password != userData.confirm_password || userData.password.length < 8) {
      if (userData.password.length < 8) {
        setUserDataErr(prev => {
          return {
            ...prev,
            password: "password must be more than 8 characters"
          }
        });
      }

      if (userData.password != userData.confirm_password) {
        setUserDataErr(prev => {
          return {
            ...prev,
            confirm_password: "password is not matching"
          }
        })
      }
      return;
    }


    setUserDataErr({ email: "", password: "", confirm_password: "" })


    try {

      postRequest('/user/login', userData).then(res => {
        console.log(res);
        localStorage.setItem('user-token', JSON.stringify(res.token))
        navigate('/')
      }).catch(err => {
        setUserDataErr(prev => {
          return {
            ...prev,
            [err.type]: err.message
          }
        })
      });
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='user-login'>
      <div className="info">
        <h1>Sign In</h1>
        <h5>Please Login To Continue</h5>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since.</p>
        <form>
          <div className="form-control">
            <label htmlFor="email">email {userDataErr.email && <span>*{userDataErr.email}</span>}</label>
            <input type="text" name="email" onChange={handleOnchange} id="email" />
          </div>
          <div className="form-control">
            <img src={showPassword ? openEye : closedEYe} onClick={() => setShowPassword(show => !show)} alt="" />
            <label htmlFor="password">password {userDataErr.password && <span>*{userDataErr.password}</span>}</label>
            <input type={showPassword ? "text" : "password"} name="password" onChange={handleOnchange} id='password' />
          </div>
          <div className="form-control">
            <label htmlFor="">confirm password {userDataErr.confirm_password && <span>*{userDataErr.confirm_password}</span>}</label>
            <input type={showPassword ? "text" : "password"} id='password-confirm-password' onChange={handleOnchange} name="confirm_password" />
          </div>
          <div className="form-control">
            <Link to="/signup">I don't have an account</Link>
            <input type="button" name="button" onClick={handleSubmit} value="Sign In" />
          </div>
        </form>
      </div>
      <div className="image">
        <img src={sideImage} alt="" />
      </div>
    </div>
  )
}

export default Login
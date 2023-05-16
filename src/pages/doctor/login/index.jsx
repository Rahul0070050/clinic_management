import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

import openEye from '../../../assets/images/open-eye.png';
import closedEYe from '../../../assets/images/closed-eye.png';
import sideImage from '../../../assets/svg/login-page-logo.svg'

import './style.scss';
import { useDispatch } from 'react-redux';
import { setInfo } from '../../../store/slice/doctorsSlice';

function Login() {
  const [userData, setUserData] = useState({ username: "", password: "", confirm_password: "" });
  const [userDataErr, setUserDataErr] = useState({ username: "", password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch()
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

    if (userData.username == "" || userData.password == "" || userData.confirm_password == "") {
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


    setUserDataErr({ username: "", password: "", confirm_password: "" })


    try {

      postRequest('/doctor/login', userData).then(res => {
        console.log(res);
        dispatch(setInfo(res.info))
        localStorage.setItem('doctor-token', JSON.stringify(res.token))
        navigate('/doctor/home')
      }).catch(err => {
        setUserDataErr(prev => {
          return {
            ...prev,
            ...err,
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
        <h1>Doctor Sign In</h1>
        <h5>Please Login To Continue</h5>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since.</p>
        <form>
          <div className="form-control">
            <label htmlFor="username">username {userDataErr.username && <span>*{userDataErr.username}</span>}</label>
            <input type="text" name="username" onChange={handleOnchange} id="username" />
          </div>
          <div className="form-control">
            <img src={showPassword ? openEye : closedEYe} onClick={() => setShowPassword(show => !show)} alt="" />
            <label htmlFor="password">password {userDataErr.password && <span>*{userDataErr.password}</span>}</label>
            <input type={showPassword ? "text" : "password"} name="password" onChange={handleOnchange} id='password' />
          </div>
          <div className="form-control">
            <label htmlFor="confirm-password">confirm password {userDataErr.confirm_password && <span>*{userDataErr.confirm_password}</span>}</label>
            <input type={showPassword ? "text" : "password"} id='confirm-password' onChange={handleOnchange} name="confirm_password" />
          </div>
          <div className="form-control">
            <input type="button" name="button" onClick={handleSubmit} value="Sign In" />
            <div></div>
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
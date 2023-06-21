import { signInWithPhoneNumber } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userLogin } from '../../../store/slice/userSlice';

import openEye from '../../../assets/images/open-eye.png';
import closedEYe from '../../../assets/images/closed-eye.png';
import sideImage from '../../../assets/svg/login-page-logo.svg'

import useFetch from '../../../hooks/useFetch';

import './style.scss';

const postRequest = useFetch("POST");
function Login() {
  const [userData, setUserData] = useState({ email: "", password: ""});
  const [userDataErr, setUserDataErr] = useState({ email: "", password: ""});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

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

    if (userData?.email == "" || userData?.password == "") {
      for (const key in userData) {
        if (userData[key] == "") {
          setUserDataErr((prev) => {
            return {
              ...prev,
              [key]: "place provide "
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

    if (userData?.password != "" && userData?.password?.length < 8) {
      if (userData?.password.length < 8) {
        setUserDataErr(prev => {
          return {
            ...prev,
            password: "more than 8 char"
          }
        });
      }

      if (userData?.password != "") {
        setUserDataErr(prev => {
          return {
            ...prev,
            password: "please provide"
          }
        })
      }
      return;
    }


    setUserDataErr({ email: "", password: "" })


    try {

      postRequest('/user/login', userData).then(res => {
        localStorage.setItem('user-token', JSON.stringify(res.token))
        localStorage.setItem('logedIn', true)
        window.location = '/'
        dispatch(userLogin(res.user))
      }).catch(err => {
        setUserDataErr(prev => {
          return {
            ...prev,
            [err?.type]: err?.message
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
            <label htmlFor="email">{userDataErr?.email && <span>*{userDataErr?.email}</span>} email</label>
            <input type="text" name="email" onChange={handleOnchange} id="email" />
          </div>
          <div className="form-control">
            <img src={showPassword ? openEye : closedEYe} onClick={() => setShowPassword(show => !show)} alt="" />
            <div className="password-label">
              <label htmlFor="password">{userDataErr?.password && <span>*{userDataErr?.password}</span>} password</label>
              <Link to="/forgot-password">forgot password</Link>
            </div>
            <input type={showPassword ? "text" : "password"} name="password" onChange={handleOnchange} id='password' />
          </div>
          <div className="form-control">
            <div className="btns">
              <Link to="/signup">I don't have an account</Link>
            </div>
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
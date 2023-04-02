import React, { useState } from 'react';

import useFetch from '../../../hooks/useFetch';

import userLogo from '../../../assets/images/user-login-logo.png';
import openEye from '../../../assets/images/white-open-eye.png';
import closedEYe from '../../../assets/images/white-closed-eye.png';

import './style.scss';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({ username: "", password: "" });
    const [userDataErr, setUserDataErr] = useState({ username: false, password: false });
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
                username: userData.username == "" ? true : false,
                password: userData.password == "" ? true : false
            }
        })
        if (userData.username == "" || userData.password == "") {
            return;
        }

        if (userData.password.length < 8) {
            setErr(prev => "password should be at least 8 characters");
            return
        }
        console.log(userData);

        try {

            postRequest('/doctor/login', userData).then(res => {
                console.log(res);
                localStorage.setItem('doctor-token', JSON.stringify(res.token))
                navigate('/doctor')
            }).catch(err => {
                setErr(prev => err)
            });
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="doctor-login">
            <form>
                <div className="logo">
                    <img src={userLogo} alt="" />
                </div>
                <h2>Login</h2>
                <div className="form-control">
                    <label htmlFor="username">username {userDataErr.username ? "* please provide username" : ""}</label>
                    <input onChange={handleOnchange} type="text" name="username" id="username" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">password {userDataErr.password ? "* please provide password" : ""}</label>
                    <input onChange={handleOnchange} type={showPassword ? "text" : "password"} name="password" id="password" />
                    <img onClick={() => setShowPassword(pres => !pres)} src={showPassword ? openEye : closedEYe} alt="" />
                </div>
                <button onClick={handleSubmit} type='button'>submit</button>
                <Link to='/forgot-password'>forgot password</Link>
                {err && <div className='error-message'>{err}</div>}
            </form>
        </div>
    )
}

export default Login;
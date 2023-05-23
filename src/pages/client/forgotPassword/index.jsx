import React, { useRef, useState } from 'react'

import 'react-toastify/dist/ReactToastify.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../firebase/config';

import './style.scss';
import useFetch from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const postRequest = useFetch("POST");
const getRequest = useFetch("GET");
function ForgotPassword() {
  let recaptchaVerifier = useRef(null);
  let confirmationResult = useRef(null);
  let navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [form, setForm] = useState("phoneNumber");
  const [otp, setOtp] = useState("");

  const [otpErr, setOtpErr] = useState(false);
  const [password, setPassword] = useState({ password: "", confirmPassword: "" });
  const [incorectPassword, setIncorectPassword] = useState(false);

  function handleOnchange(e) {
    if (form == "phoneNumber") {
      if (Number.isInteger(Number(e.target.value))) {
        setPhone(e.target.value)
      }
      return
    }
    if (form == "enterOtp") {
      if (Number.isInteger(Number(e.target.value))) {
        setOtp(e.target.value)
      }
      return
    }
    if (form == "resetPassword") {
      setPassword(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }
  }

  async function submitHandler() {
    if (phone == "") {
      setPhoneErr("is invalid")
      return
    }
    getRequest(`/user/check-mobile/+91${phone}`).then(async res => {
      if (res.ok) {
        if (!recaptchaVerifier.current) {
          try {
            recaptchaVerifier.current = await new RecaptchaVerifier('recaptcha-container', {}, auth);
          } catch (error) {
            console.log(error);
          }
        }

        if (!confirmationResult.current) {
          try {
            confirmationResult.current = await signInWithPhoneNumber(auth, `+91${phone}`, recaptchaVerifier.current)
            setForm("enterOtp")
            setOtp("")
            console.log(confirmationResult.current);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }).catch(err => {
      setPhoneErr(err?.mobile);
    })
  }

  function verifyOtp() {
    try {
      confirmationResult.current.confirm(otp).then(async res => {
        setForm("resetPassword")
      }).catch((err) => {
        if (err.message == "Firebase: Error (auth/code-expired).") {
          setOtpErr(err.message)
        }
        if (err.message == "Firebase: Error (auth/invalid-verification-code).") {
          setOtpErr(err.message)
        }
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  function submitPassword() {
    if (password.password == password.confirmPassword) {
      setIncorectPassword(false)
      try {
        postRequest("/user/reset-password", { ...password, mobile: phone }).then(res => {
          console.log(res);
          navigate('/login')
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      setIncorectPassword(true)
    }
  }

  return (
    <div className='forgot-password-user'>
      {form == "phoneNumber" &&
        <form>
          <h1>skin care</h1>
          <p>enter your mobile number</p>
          <div className="form-control">
            <label htmlFor="mobile">Mobile number {phoneErr && phoneErr}</label>
            <input type="tel" value={phone} placeholder='phone number' style={{ border: phoneErr ? '2px solid red' : '' }} onChange={handleOnchange} name="phone" id="phone" />
          </div>
          <div className="btns">
            <div id="recaptcha-container"></div>
            <button type='button' onClick={submitHandler}>Submit</button>
          </div>
        </form>
      }
      {form == "enterOtp" &&
        <form>
          <h1>skin care</h1>
          <div className="form-control">
            <p>check your mobile</p>
            <input type="tel" value={otp} style={{ border: otpErr ? '2px solid red' : '' }} placeholder='Enter OTP' onChange={handleOnchange} name="otp" id="otp" />
          </div>
          <div className="btns">
            <button type='button' onClick={verifyOtp}>send OTP</button>
          </div>
        </form>
      }
      {form == "resetPassword" && <form>
        <h1>skin care</h1>
        <p>enter new password</p>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input type="password" value={password.password} placeholder="password" onChange={handleOnchange} name="password" id="password" />
          <label htmlFor="">confirm password {incorectPassword && " *is not patching"}</label>
          <input type="password" value={password.confirmPassword} placeholder="confirmPassword" onChange={handleOnchange} name="confirmPassword" id="confirmPassword" />
        </div>
        <div className="btns">
          <button type='button' onClick={submitPassword}>Submit</button>
        </div>
      </form>}
    </div>
  )
}

export default ForgotPassword
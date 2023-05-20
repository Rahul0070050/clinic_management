import React, { useState } from 'react'

import { checkEmail, checkMobileNumberHasAnyCharacter, checkStringHasNumbers } from '../../../util/utilFunnctions';

import './style.scss';

function BookAppointments() {

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();

  var maxDate = year + '-' + month + '-' + day;


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    appointmentTime: "",
    appointmentDate: "",
    doctorName: "",
    department: "",
    address: "",
    age: ""
  })
  const [formDataErr, setFormDataErr] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    appointmentTime: "",
    appointmentDate: "",
    doctorName: "",
    department: "",
    address: "",
    age: ""
  })

  function onchangeHandler(e) {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }


  function submitHandler() {
    if (formData.firstName == "" ||
      formData.lastName == "" ||
      formData.email == "" ||
      formData.mobile == "" ||
      formData.dob == "" ||
      formData.gender == "" ||
      formData.address == "" ||
      formData.appointmentDate == "" ||
      formData.appointmentTime == "" ||
      formData.department == "" ||
      formData.age == "") {
      for (const key in formData) {
        if (formData[key] == "") {
          setFormDataErr(prev => {
            let message = "please provide "
            return {
              ...prev,
              [key]: message
            }
          })
        } else {
          setFormDataErr(prev => {
            return {
              ...prev,
              [key]: ""
            }
          })
        }
      }

      return;
    } else {

      let errorFlag = false;
      for (const key in formData) {
        let message = ""
        if ((key == "firstName" || key == "lastName") && checkStringHasNumbers(formData[key])) {
          errorFlag = true
          message = "doesn't include numbers in "
        }
        setFormDataErr(prev => {
          return {
            ...prev,
            [key]: message
          }
        })
      }

      if (errorFlag) {
        return
      }
    }
    if (!checkEmail(formData.email)) {
      setFormDataErr(prev => {
        return {
          ...prev,
          email: "please provide valid "
        }
      })
      return;
    }

    if (!checkMobileNumberHasAnyCharacter(formData.mobile)) {
      setFormDataErr(prev => {
        return {
          ...prev,
          mobile: "invalid "
        }
      })
      return;
    }

  }
  return (
    <div className='user-appointment-booking'>
      <div className="heading">
        <h1>Book Appointment</h1>
      </div>
      <form action="">
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="firstName">{formDataErr.firstName && <span>{formDataErr.firstName}*</span>}first name</label>
            <input type="text" id='firstName' name='firstName' onChange={onchangeHandler} value={formData.firstName} />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">{formDataErr.lastName && <span>{formDataErr.lastName}*</span>}last name</label>
            <input type="text" id='lastName' name='lastName' onChange={onchangeHandler} value={formData.lastName} />
          </div>
          <div className="form-control">
            <label htmlFor="email">{formDataErr.email && <span>{formDataErr.email}*</span>}email</label>
            <input type="email" id='email' name='email' onChange={onchangeHandler} value={formData.email} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="mobile">{formDataErr.mobile && <span>{formDataErr.mobile}*</span>}mobile number</label>
            <input type="text" id='mobile' name='mobile' onChange={onchangeHandler} value={formData.mobile} />
          </div>
          <div className="form-control">
            <label htmlFor="gender">{formDataErr.gender && <span>{formDataErr.gender}*</span>}gender</label>
            <input type="text" id='gender' name='gender' onChange={onchangeHandler} value={formData.gender} />
          </div>
          <div className="form-control">
            <label htmlFor="dob">{formDataErr.dob && <span>{formDataErr.dob}*</span>}DOB</label>
            <input type="text" id='dob' name='dob' max={maxDate} onChange={onchangeHandler} value={formData.dob} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="age">{formDataErr.age && <span>{formDataErr.age}*</span>}age</label>
            <input type="number" id='age' name='age' onChange={onchangeHandler} value={formData.age} />
          </div>
          <div className="form-control">
            <label htmlFor="appointmentTime">{formDataErr.appointmentTime && <span>{formDataErr.appointmentTime}*</span>}appointment time</label>
            <input type="text" id='appointmentTime' name='appointmentTime' onChange={onchangeHandler} value={formData.appointmentTime} />
          </div>
          <div className="form-control">
            <label htmlFor="appointmentDate">{formDataErr.appointmentDate && <span>{formDataErr.appointmentDate}*</span>}appointment date</label>
            <input type="text" id='appointmentDate' name='appointmentDate' onChange={onchangeHandler} value={formData.appointmentDate} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="doctorName">{formDataErr.doctorName && <span>{formDataErr.doctorName}*</span>}doctor name</label>
            <input type="text" id='doctorName' name='doctorName' onChange={onchangeHandler} value={formData.doctorName} />
          </div>
          <div className="form-control">
            <label htmlFor="department">{formDataErr.department && <span>{formDataErr.department}*</span>}department</label>
            <input type="text" id='department' name='department' onChange={onchangeHandler} value={formData.department} />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="address">{formDataErr.address && <span>{formDataErr.address}*</span>}address</label>
          <textarea type="address" rows={5} id='address' name='address' onChange={onchangeHandler} value={formData.address} />
        </div>
      </form>
      <input type="button" value="submit" onClick={submitHandler} />
    </div>
  )
}

export default BookAppointments
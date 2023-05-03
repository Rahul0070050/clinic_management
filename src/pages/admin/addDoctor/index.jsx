import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'

import './style.scss'
import { checkEmail, checkMobileNumberHasAnyCharacter, checkPasswordHasSpecialCharacters } from '../../../util/utilFunnctions'
function AddDoctor() {
  const [formData, setFormData] = useState({ CTC: "", experience: "", age: "", username: "", password: "", email: "", mobile: "", department: "" })
  const [formDataErr, setFormDataErr] = useState({ CTC: "", experience: "", age: "", username: "", password: "", email: "", mobile: "", department: "" })

  const postRequest = useFetch("POST");
  function onHandleChange(e) {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  function onSubmitHandler() {
    console.log(formData);
    if (formData.CTC == "" || formData.experience == "" || formData.age == "" || formData.username == "" || formData.password == "" || formData.email == "" || formData.mobile == "" || formData.department == "") {
      for (const key in formData) {
        if (formData[key] == "") {
          setFormDataErr(prev => {
            return {
              ...prev,
              [key]: "please provide "
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
      if(!checkEmail(formData.email)) {
        setFormDataErr(prev => {
          return {
            ...prev,
            email: "please provide valid"
          }
        })
        return;
      } else {
        setFormDataErr(prev => {
          return {
            ...prev,
            email: ""
          }
        })
      }
      if(formData.mobile.length > 10 || formData.mobile.length < 10) {
        setFormDataErr(prev => {
          return {
            ...prev,
            mobile: "please provide valid"
          }
        })

        return;
      } else {
        setFormDataErr(prev => {
          return {
            ...prev,
            mobile: ""
          }
        })
      }

      if(!checkPasswordHasSpecialCharacters(formData.password)) {
        setFormDataErr(prev => {
          return {
            ...prev,
            password: "password must have special character"
          }
        })

        return
      } else {
        setFormDataErr(prev => {
          return {
            ...prev,
            password: ""
          }
        })
      }
      
      postRequest('/admin/add-doctor', formData).then(res => {
        if (res.ok) {
          location = "/admin/doctors"
        }
      }).catch(err => {
        delete err?.ok;
        setFormDataErr(prev => {
          return {
            ...prev,
            ...err
          }
        })
      })
    }
  }
  return (
    <div className='admin-add-doctor'>
      <div className="header">
        <h1>Add Doctor</h1>
      </div>
      <form>
        <h5>Add Doctor Information</h5>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="userName">{formDataErr.username && <span>{formDataErr.username}</span>} user name</label>
            <input onChange={onHandleChange} type="text" name="username" id="userName" />
          </div>
          <div className="form-control">
            <label htmlFor="password">{formDataErr.password && <span>{formDataErr.password}</span>} password</label>
            <input onChange={onHandleChange} type="password" name="password" id="password" />
          </div>
        </div>
        <div className="form-group">
          <div className="inner-form-group">
            <div className="form-control">
              <label htmlFor="CTC">{formDataErr.CTC && <span>{formDataErr.CTC}</span>} CTC</label>
              <input onChange={onHandleChange} type="number" name="CTC" id="CTC" />
            </div>
            <div className="form-control">
              <label htmlFor="experience">{formDataErr.experience && <span>{formDataErr.experience}</span>} experience(in year)</label>
              <input onChange={onHandleChange} type="text" name="experience" id="experience" />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="age">{formDataErr.age && <span>{formDataErr.age}</span>} age</label>
            <input onChange={onHandleChange} type="number" name="age" id="age" />
          </div>
        </div>
        <div className="form-group">
          <div className="inner-form-group">
            <div className="form-control">
              <label htmlFor="email">{formDataErr.email && <span>{formDataErr.email}</span>} email</label>
              <input onChange={onHandleChange} type="text" name="email" id="email" />
            </div>
          </div>
          <div className="inner-form-group">
            <div className="form-control">
              <label htmlFor="mobileNumber">{formDataErr.mobile && <span>{formDataErr.mobile}</span>} mobile</label>
              <input onChange={onHandleChange} type="number" name="mobile" id="mobileNumber" />
            </div>
            <div className="form-control">
              <label htmlFor="department">{formDataErr.department && <span>{formDataErr.department}</span>} department</label>
              <input onChange={onHandleChange} type="text" name="department" id="department" />
            </div>
          </div>
        </div>
        <input type="button" value="register" id="" onClick={onSubmitHandler} />
      </form>
    </div>
  )
}

export default AddDoctor
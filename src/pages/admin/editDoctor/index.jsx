import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import useFetch from '../../../hooks/useFetch';
import { checkEmail } from '../../../util/utilFunnctions'

import './style.scss'
const getRequest = useFetch("GET")
const postRequest = useFetch("POST")

function EditDoctor() {
  let location = useLocation()
  const [doctor, setDoctor] = useState({
    CTC: "",
    age: "",
    department: "",
    email: "",
    experience: "",
    mobile: "",
    username: "",
    id: location.state.doctor
  })
  const [doctorErr, setDoctorErr] = useState({
    CTC: "",
    age: "",
    department: "",
    email: "",
    experience: "",
    mobile: "",
    username: "",
  })
  useEffect(() => {
    getRequest(`/admin/get-doctor/${location.state.doctor}`).then(result => {
      setDoctor(result.doctor)
    })
  }, [])

  function onHandleChange(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    setDoctor(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  function onSubmitHandler() {
    if (doctor.CTC == "" || doctor.experience == "" || doctor.age == "" || doctor.username == "" || doctor.email == "" || doctor.mobile == "" || doctor.department == "") {
      for (const key in doctor) {
        if (doctor[key] == "") {

          setDoctorErr(prev => {
            return {
              ...prev,
              [key]: "please provide "
            }
          })
        } else {

          setDoctorErr(prev => {
            return {
              ...prev,
              [key]: ""
            }
          })
        }
      }

      return;

    } else {

      if (!checkEmail(doctor.email)) {

        setDoctorErr(prev => {
          return {
            ...prev,
            email: "please provide valid "
          }
        })

        return;
      } else {

        setDoctorErr(prev => {
          return {
            ...prev,
            email: ""
          }
        })
      }

      if (doctor.mobile.length > 10 || doctor.mobile.length < 10) {

        setDoctorErr(prev => {
          return {
            ...prev,
            mobile: "please provide valid "
          }
        })

        return;
      } else {

        setDoctorErr(prev => {
          return {
            ...prev,
            mobile: ""
          }
        })
      }

      console.log(doctor);


      postRequest('/admin/update-doctor', doctor).then(res => {
        if (res.ok) {
          window.location = "/admin/doctors"
        }
      }).catch(err => {
        console.log(err);
        delete err?.ok;
        setDoctorErr(prev => {
          return {
            ...prev,
            ...err
          }
        })
      })
    }
  }

  return (
    <div className='admin-edit-doctor'>
      <form>
        <div className="header">
          <img src="https://www.freepnglogos.com/uploads/doctor-png/doctor-ufe-foccupation-pinterest-boy-cards-19.png" alt="" />
          <h2>{doctor.username}</h2>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="userName" style={{ color: `${doctorErr.username ? 'red' : ''}` }}>{doctorErr.username && <span>*{doctorErr.username}</span>}userName</label>
            <input type="text" onChange={onHandleChange} value={doctor.username} name="username" id="userName" />
          </div>
          <div className="form-control">
            <label htmlFor="email" style={{ color: `${doctorErr.email ? 'red' : ''}` }}>{doctorErr.email && <span>*{doctorErr.email}</span>}email</label>
            <input type="email" onChange={onHandleChange} value={doctor.email} name="email" id="email" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="mobile" style={{ color: `${doctorErr.mobile ? 'red' : ''}` }}>{doctorErr.mobile && <span>*{doctorErr.mobile}</span>}mobile</label>
            <input type="tel" onChange={onHandleChange} value={doctor.mobile} name="mobile" id="mobile" />
          </div>
          <div className="form-control">
            <label htmlFor="department" style={{ color: `${doctorErr.department ? 'red' : ''}` }}>{doctorErr.department && <span>*{doctorErr.department}</span>}department</label>
            <input type="text" onChange={onHandleChange} value={doctor.department} name="department" id="department" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="CTC" style={{ color: `${doctorErr.CTC ? 'red' : ''}` }}>{doctorErr.CTC && <span>*{doctorErr.CTC}</span>}CTC</label>
            <input type="number" onChange={onHandleChange} value={doctor.CTC} name="CTC" id="CTC" />
          </div>
          <div className="form-control">
            <label htmlFor="age" style={{ color: `${doctorErr.age ? 'red' : ''}` }}>{doctorErr.age && <span>*{doctorErr.age}</span>}age</label>
            <input type="number" onChange={onHandleChange} value={doctor.age} name="age" id="age" />
          </div>
          <div className="form-control">
            <label htmlFor="experience" style={{ color: `${doctorErr.experience ? 'red' : ''}` }}>{doctorErr.experience && <span>*{doctorErr.experience}</span>}experience</label>
            <input type="number" onChange={onHandleChange} value={doctor.experience} name="experience" id="experience" />
          </div>
        </div>
        <input type="button" onClick={onSubmitHandler} value="sublit" />
      </form>
    </div>
  )
}

export default EditDoctor
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useFetch from '../../../hooks/useFetch'

import viewIcon from '../../../assets/images/view-icon.png'

import './style.scss'

const getRequest = useFetch("GET")
function DoctorProfile() {
  const [doctor, setDoctor] = useState({})
  const [patients, setPatients] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getRequest(`/doctor/get-profile`).then(res => {
      console.log(res.doctor);
      setDoctor(res.doctor)
      console.log(res.patients);
      setPatients(res.patients)
    })
  }, [])
  return (
    <div className='doctor-profile-page'>
      <div className="doctor-info">
        <h2 className='doctor-info-header'>doctor info</h2>
        <div className="info">
          <div className="keys">
            <span>username</span>
            <span>department</span>
            <span>email</span>
            <span>mobile</span>
            <span>CTC</span>
            <span>experience</span>
          </div>
          <div className="values">
            <span>{doctor?.username}</span>
            <span>{doctor?.department}</span>
            <span>{doctor?.email}</span>
            <span>{doctor?.mobile}</span>
            <span>{doctor?.CTC}</span>
            <span>{doctor?.experience}</span>
          </div>
        </div>
      </div>
      <div className="doctor-patients">
        <div className='header'>
          <h1>All Patients</h1>
          <br />
        </div>
        <div className="container">
          <div className="patients">
            <div className="container">
              <div className="table">
                <div className="table-header">
                  <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">ID</a></div>
                  <div className="header__item"><a id="name" className="filter__link filter__link--number" href="#">Name</a></div>
                  <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">age</a></div>
                  <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">gender</a></div>
                  <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">mobile</a></div>
                  <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#"></a></div>
                </div>
                <div className="table-content">
                  {patients.map((patient, i) => <div className="table-row">
                    <div className="table-data">#{i + 1}</div>
                    <div className="table-data">{patient.firstName + " " + patient.lastName}</div>
                    <div className="table-data">{patient.age}</div>
                    <div className="table-data">{patient.gender}</div>
                    <div className="table-data">{patient.mobile}</div>
                    <div className="table-data">
                      <span onClick={() => navigate('/doctor/patients/view-info', { state: { id: patient._id } })}>view</span>
                    </div>
                  </div>)}
                </div>
              </div>
              {/* <div className='no-history-available'>No Patients</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
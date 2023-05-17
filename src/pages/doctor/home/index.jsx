import React, { useLayoutEffect, useState } from 'react'

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'
import './style.scss'
import useFetch from '../../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctors } from '../../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';

function DoctorHome() {
  const navigate = useNavigate()
  const getRequest = useFetch('GET');
  const dispatch = useDispatch()
  const { doctors } = useSelector(state => state.root.user)

  const [appointments, setAppointments] = useState([])

  useLayoutEffect(() => {
    getRequest('/doctor/get-all-doctors').then(res => {
      dispatch(setDoctors(res?.doctors))
    })
    getRequest('/doctor/get-todays-appointments').then(res => {
      setAppointments(res.result)
    })
  }, [])

  function onCancelHandler(id, i) {
    getRequest(`/doctor/cancel-appointment/${id}`).then(res => {
      if (res.ok) {
        setAppointments(prev => {
          return [...prev, prev[i].status = "canceled"]
        })
      }
    })
  }

  return (
    <div className='doctor-home-page'>
      <div className="patients">
        <h2>Today's Appointments</h2>
        <div class="container">
          <div className="table">
            <div className="table-header">
              <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">ID</a></div>
              <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
              <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">mobile</a></div>
              <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">gender</a></div>
              <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">time</a></div>
              <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">date</a></div>
              <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">age</a></div>
              <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">dob</a></div>
              <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Actions</a></div>
            </div>
            <div className="table-content">
              {appointments.map((item, i) => {
                if (item.status == "canceled") return null
                else return <div key={i} className="table-row" >
                  <div className="table-data">#{i}</div>
                  <div className="table-data">{item.firstName + " " + item.lastName}</div>
                  <div className="table-data">{item.mobile}</div>
                  <div className="table-data">{item.gender}</div>
                  <div className="table-data">{item.appointmentTime}</div>
                  <div className="table-data">{new Date(item.appointmentDate).toLocaleDateString()}</div>
                  <div className="table-data">{item.age}</div>
                  <div className="table-data">{item.dob}</div>
                  <div className="table-data">
                    <span>{item.status != "new" ? <div></div> : <div className='view-appointment' onClick={() => navigate('/doctor/appointments/view-details', { state: { id: item._id } })}>view</div>}</span>
                  </div>
                </div>
              }
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="doctors-list">
        <div className='container'>
          <h2>Doctors List</h2>
          <div className="list">
            {doctors && doctors.map(item => (<div className="item">
              <div className="info">
                <h3>{item.username}</h3>
                <h5>{item.department}</h5>
              </div>
              <div className="action">
                <a href="">chat</a>
              </div>
            </div>))}
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default DoctorHome
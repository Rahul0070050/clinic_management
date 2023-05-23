import React, { useEffect, useState } from 'react'

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'

import LineChart from '../../../components/adminComponents/charts/lineChart'
import AriaChart from '../../../components/adminComponents/charts/ariaChart'

import './style.scss'
import useFetch from '../../../hooks/useFetch'
import StatusCard from '../../../components/adminComponents/StatusCard'

const getRequest = useFetch("GET")


function AdminHome() {
  const [appointments, setAppointments] = useState([])
  const [cardData, setCardData] = useState([])
  useEffect(() => {
    getRequest(`/admin/get-appointments`).then(data => {
      console.log(data);
      setAppointments(() => {
        return data.sort(function (a, b) {
          return new Date(b.appointmentDate) - new Date(a.appointmentDate);
        });
      });
    })

    getRequest(`/admin/get-info`).then(data => {
      setCardData (data)
    })
  }, [])

  return (
    <div className='admin-home-page'>
      <div className="status">
        {cardData && cardData.map(item => {
          return <StatusCard name={item.name} count={item.count} />
        })}
      </div>
      <div className="charts">
        
      </div>
      <div className="all-patients">
        <div className="patients">
          <h2>All Appointments</h2>
          <div className="container">
            <div className="table">
              <div className="table-header">
                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">ID</a></div>
                <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
                <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Phone</a></div>
                <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">email</a></div>
                <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">gender</a></div>
                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">Time</a></div>
                <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">Date</a></div>
                <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">DOB</a></div>
              </div>
              <div className="table-content">
                <div className="table-content">
                  {appointments.map((item, i) => {
                    return <div className="table-row" key={i}>
                      <div className="table-data">#{i}</div>
                      <div className="table-data">{item.firstName + " " + item.lastName}</div>
                      <div className="table-data">{item.mobile}</div>
                      <div className="table-data">{item.email}</div>
                      <div className="table-data">{item.gender}</div>
                      <div className="table-data">{item.appointmentTime}</div>
                      <div className="table-data">{new Date(item.appointmentDate).toLocaleDateString()}</div>
                      <div className="table-data">{item.dob}</div>
                    </div>
                  }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
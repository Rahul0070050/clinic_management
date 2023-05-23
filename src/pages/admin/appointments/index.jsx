import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch'

import { useNavigate } from 'react-router-dom'

import './style.scss'

const getRequest = useFetch("GET")
function Appointments() {
    const [appointments, setAppointments] = useState([])
    const [filter, setFilter] = useState('new')
    const navigate = useNavigate()
    useEffect(() => {
        try {
            // getRequest('/doctor/get-dates').then(res => {
            //     console.log(res);
            //     setDates([...new Set([...res.dates])])
            // })
            getAppointments()
        } catch (error) {
            console.log(error);
        }
    }, [])



    function getAppointments(date = new Date()) {
        console.log(date);
        getRequest(`/admin/get-appointments`).then(data => {
            console.log(data);
            setAppointments(() => {
                return data.sort(function (a, b) {
                    return new Date(b.appointmentDate) - new Date(a.appointmentDate);
                });
            });
        }).catch(err => console.log(err))
    }

    function sortAppointmentsByStatus(status) {
        setFilter(status)
    }

    function onCancelHandler(id, i) {
        console.log(id);
        getRequest(`/admin/cancel-appointment/${id}`).then(res => {
            if (res.ok) {
                setAppointments(prev => {
                    return [...prev, prev[i].status = "canceled"]
                })
            }
        })
    }

    console.log(appointments);

    return (
        <div className='admin-appointments'>
            <div className="patients">
                <div>
                    <h2>Appointments</h2>
                </div>
                <div className="container">
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
                        </div>
                        <div className="table-content">
                            {appointments.map((item, i) => {
                                if (filter && filter != item?.status) return null
                                else return <div className="table-row" key={i}>
                                    <div className="table-data">#{i}</div>
                                    <div className="table-data">{item.firstName + " " + item.lastName}</div>
                                    <div className="table-data">{item.mobile}</div>
                                    <div className="table-data">{item.gender}</div>
                                    <div className="table-data">{item.appointmentTime}</div>
                                    <div className="table-data">{new Date(item.appointmentDate).toLocaleDateString()}</div>
                                    <div className="table-data">{item.age}</div>
                                    <div className="table-data">{item.dob}</div>
                                </div>
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointments
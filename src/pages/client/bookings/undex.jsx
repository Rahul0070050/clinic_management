import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

import './style.scss'

const getRequest = useFetch("GET")
const postRequest = useFetch("POST")
function Bookings() {
    const [appointments, setAppointments] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getRequest("/user/get-all-appointments").then(res => {
            console.log(res.oldAppointments,res.newAppointments);
            setAppointments([...res.oldAppointments,...res.newAppointments])
        }).catch(err => {
            console.log(err);
        })
    }, [])

    function handleCancel(id) {
        postRequest(`/user/cancel-appointment/${id}`).then(res => {
            if(res.ok) {
                setNewAppointments(prev => {
                    return prev.filter(item => {
                        if(item._id == id) {
                            item.status == "canceled"
                            return
                        }
                        return item
                    })
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    
    return (
        <div className='user-appointment-bookings'>
            <div className="new-booking">
                <h2>New Bookings</h2>
                <div className="table-content">
                    {appointments && appointments?.map((appointment, i) => {
                        if(appointment.status != "new") return
                        return (
                            <div className='appointment' key={i}>
                                <div className="left">
                                    <div>
                                        <span>Name</span>
                                        <span>Age</span>
                                        <span>Gender</span>
                                        <span>department</span>
                                    </div>
                                    <div>
                                        <span>{appointment.firstName + " " + appointment.lastName}</span>
                                        <span>{appointment.age}</span>
                                        <span>{appointment.gender}</span>
                                        <span>{appointment.department}</span>
                                    </div>
                                </div>
                                <div className="right">
                                    <div>
                                        <span>doctor</span>
                                        <span>date</span>
                                        <span>time</span>
                                        <span>Status</span>
                                    </div>
                                    <div>
                                        <span>{appointment.doctorName}</span>
                                        <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                                        <span>{appointment.appointmentTime}</span>
                                        <span>{appointment.status}</span>
                                    </div>
                                </div>
                                {appointment.status == "new" && <button onClick={() => handleCancel(appointment._id)}>cancel</button>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="old-booking">
                <h2>Old Bookings</h2>
                <div className="table-content">
                    {appointments && appointments?.map((appointment, i) => {
                        if(appointment.status == "new") return
                        return (
                            <div className='appointment' key={i}>
                                <div className="left">
                                    <div>
                                        <span>Name</span>
                                        <span>Age</span>
                                        <span>Gender</span>
                                        <span>department</span>
                                    </div>
                                    <div>
                                        <span>{appointment.firstName + " " + appointment.lastName}</span>
                                        <span>{appointment.age}</span>
                                        <span>{appointment.gender}</span>
                                        <span>{appointment.department}</span>
                                    </div>
                                </div>
                                <div className="right">
                                    <div>
                                        <span>doctor</span>
                                        <span>date</span>
                                        <span>time</span>
                                        <span>Status</span>
                                    </div>
                                    <div>
                                        <span>{appointment.doctorName}</span>
                                        <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                                        <span>{appointment.appointmentTime}</span>
                                        <span>{appointment.status == "new" ? "outDated" : appointment.status}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Bookings
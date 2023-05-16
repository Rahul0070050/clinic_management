import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import useFetch from '../../../hooks/useFetch';
import './style.scss'
import Prescription from '../../../components/componests/prescription';

const getRequest = useFetch("GET")
function PatientProfile() {
    const location = useLocation();
    const [patient, setPatient] = useState({})
    useEffect(() => {
        const { id } = location.state
        console.log(id);
        getRequest(`/doctor/get-patient-info/${location.state.id}`).then(res => {
            setPatient(res.patient)
        })
    }, [])

    return (
        <div className='patient-Profile'>
            <div className="patient-info">
                <h2>user info</h2>
                <div className="info">
                    <div className="keys">
                        <span>name</span>
                        <span>email</span>
                        <span>mobile</span>
                        <span>gender</span>
                        <span>dob</span>
                        <span>age</span>
                        <span>address</span>
                    </div>
                    <div className="values">
                        <span>{patient?.firstName + " " + patient?.lastName}</span>
                        <span>{patient?.email}</span>
                        <span>{patient?.mobile}</span>
                        <span>{patient?.gender}</span>
                        <span>{patient?.dob}</span>
                        <span>{patient?.age}</span>
                        <span>{patient?.address}</span>
                    </div>
                </div>
            </div>
            <div className="patient-history">
                <div className='header'>
                    <h1>History</h1>
                </div>
                <div className="container">
                    {patient?.history?.map(item => {
                        console.log(item);
                        return <div className="history">
                            <div className="info">
                                <div className="keys">
                                    <span>date</span>
                                    <span>time</span>
                                </div>
                                <div className="values">
                                    <span>{new Date(item.date).toLocaleDateString()}</span>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                            <div className="prescriptions">
                                <div className="header">
                                    <h2>Prescription</h2>
                                </div>
                                <div className="body">
                                    <Prescription prescriptions={item?.prescription} />
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default PatientProfile
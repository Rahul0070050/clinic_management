import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch';

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'

import './style.scss'

const getRequest = useFetch("GET");

function AllPatientsList() {
    const [patients, setPatients] = useState([])
    useEffect(() => {
        getRequest('/admin/get-all-patients').then(response => {
            setPatients(response.allPatients)
        })
    }, [])

    return (
        <div className='admin-all-patients-list'>
            <div className="all-patients">
                <div className="patients">
                    <h2>All Patients</h2>
                    <div className="container">
                        <div className="table">
                            <div className="table-header">
                                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">ID</a></div>
                                <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
                                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">age</a></div>
                                <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">gender</a></div>
                                <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">doctor name</a></div>
                                <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">DOB</a></div>
                                <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">mobile</a></div>
                                <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">email</a></div>
                                {/* <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Actions</a></div> */}
                            </div>
                            <div className="table-content">
                                {patients.map((patient,i) => <div className="table-row">
                                    <div className="table-data">#{i+1}</div>
                                    <div className="table-data">{patient.firstName+ " "+patient.lastName}</div>
                                    <div className="table-data">{patient.age}</div>
                                    <div className="table-data">{patient.gender}</div>
                                    <div className="table-data">{patient.doctorName}</div>
                                    <div className="table-data">{patient.dob}</div>
                                    <div className="table-data">{patient.mobile}</div>
                                    <div className="table-data">{patient.email}</div>
                                    {/* <div className="table-data">
                                        <span>
                                            <img src={editIcon} alt="" />
                                            <img src={deleteIcon} alt="" />
                                        </span>
                                    </div> */}
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllPatientsList
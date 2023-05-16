import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import useFetch from '../../../hooks/useFetch';
import viewIcon from '../../../assets/images/view-icon.png'
import './style.scss';

const getRequest = useFetch("GET")

function Patients() {
    const [patients, setPatients] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getRequest('/doctor/get-patients').then(res => {
            setPatients(res.allPatients)
        })
    }, [])

    function deleteHandler(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                console.log('1');
                getRequest(`/doctor/delete-patient/${id}`).then(res => {
                    if (res.ok) {
                        setPatients(prev => {
                            return prev.filter(patient => patient._id != id && patients)
                        })
                    }
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })

            }
        });
    }

    return (
        <div className='patients'>
            <div className="doctors-list">
                <div className="table">
                    <div className="table-header">
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">#</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">name</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">age</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">gender</a></div>
                        <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">DOB</a></div>
                        <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">mobile</a></div>
                        <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">email</a></div>
                        <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">actions</a></div>
                    </div>
                    <div className="table-content">
                        {patients.map((patient, i) => (
                            <div className="table-row" key={i}>
                                <div className="table-data">#2234</div>
                                <div className="table-data">{patient?.firstName + patient?.lastName}</div>
                                <div className="table-data">{patient?.age}</div>
                                <div className="table-data">{patient?.gender}</div>
                                <div className="table-data">{patient?.dob}</div>
                                <div className="table-data">{patient?.mobile}</div>
                                <div className="table-data">{patient?.email}</div>
                                <div className="table-data">
                                    <span onClick={() => navigate('/doctor/patients/view-info',{state:{id:patient._id}})}><img src={viewIcon} alt="" /></span>
                                    <span>
                                        <img src={deleteIcon} alt="" onClick={() => deleteHandler(patient?._id)} />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Patients
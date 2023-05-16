import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch'

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'
import './style.scss';
import { Link, useNavigate, } from 'react-router-dom';

function AdminDoctorsList() {
    const getRequest = useFetch("GET");
    const [doctors, setDoctors] = useState(() => [])
    const navigate = useNavigate()
    useEffect(() => {
        getRequest('/admin/get-all-doctors').then(res => {
            setDoctors(res.allDoctors)
        })
    }, [])

    function deleteHandler(id) {
        swal({
            title: "Are you sure?",
            text: "Are you sure!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if(willDelete) {
                setDoctors(prev => {
                    return prev.filter(doctor => doctor._id != id)
                })
            }
        });
    }

    return (
        <div className='admin-doctors-list-page'>
            <div className="header">
                <h1>All Doctors</h1>
                <Link to="/admin/doctors/add">add Doctor</Link>
            </div>
            <div className="doctors-list">
                <div className="table">
                    <div className="table-header">
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">#</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">username</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">email</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">phone</a></div>
                        <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">age</a></div>
                        <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">CTC</a></div>
                        <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">experience</a></div>
                        <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">department</a></div>
                        <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">actions</a></div>
                    </div>
                    <div className="table-content">
                        {doctors.map((doctor, i) => (
                            <div className="table-row" key={i}>
                                <div className="table-data">#2234</div>
                                <div className="table-data">{doctor?.username}</div>
                                <div className="table-data">{doctor?.email}</div>
                                <div className="table-data">{doctor?.mobile}</div>
                                <div className="table-data">{doctor?.age}</div>
                                <div className="table-data">{doctor?.CTC}</div>
                                <div className="table-data">{doctor?.experience}</div>
                                <div className="table-data">{doctor?.department}</div>
                                <div className="table-data">
                                    <span>
                                        <img src={editIcon} onClick={() => {
                                            navigate('/admin/doctors/editDoctor', { state: { doctor: doctor?._id } })
                                        }} alt="" />
                                        <img src={deleteIcon} alt="" onClick={() => deleteHandler(doctor?._id)} />
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

export default AdminDoctorsList
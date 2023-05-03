import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch'

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'
import './style.scss';
import { Link } from 'react-router-dom';

function AdminDoctorsList() {
    const getRequest = useFetch("GET");
    const [doctors, setDoctors] = useState(() => [])
    useEffect(() => {
        getRequest('/admin/get-all-doctors').then(res => {
            console.log(res);
            setDoctors(res.allDoctors)
        })
    }, [])
    return (
        <div className='admin-doctors-list-page'>
            <div className="header">
                <h1>All Doctors</h1>
                <Link to="/admin/doctors/add">Add New Doctor</Link>
            </div>
            <div className="doctors-list">
                <table>
                    <thead>
                        <tr>
                            <td>username</td>
                            <td>email</td>
                            <td>phone</td>
                            <td>age</td>
                            <td>CTC</td>
                            <td>experience</td>
                            <td>department</td>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map(doctor => (<tr>
                            <td>{doctor?.username}</td>
                            <td>{doctor?.email}</td>
                            <td>{doctor?.mobile}</td>
                            <td>{doctor?.age}</td>
                            <td>{doctor?.CTC}</td>
                            <td>{doctor?.experience}-y</td>
                            <td>{doctor?.department}</td>
                            <td><button>view</button></td>
                            <td><img src={deleteIcon} /></td>
                            <td><img src={editIcon} /></td>
                        </tr>))}
                    </tbody>
                </table>
                <div className="buttons">
                    <button>&lt;</button>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <button>&gt;</button>
                </div>
            </div>
        </div>
    )
}

export default AdminDoctorsList
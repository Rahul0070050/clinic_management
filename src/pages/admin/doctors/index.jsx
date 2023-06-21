import React, { useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch'

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import filterIcon from '../../../assets/images/filter.png'
import editIcon from '../../../assets/svg/edit-icon.svg'

import './style.scss';
import Filter from '../../../components/adminComponents/filter';

function AdminDoctorsList() {
    const getRequest = useFetch("GET");
    const [count, setCount] = useState(0)
    const [doctors, setDoctors] = useState(() => [])
    const [allDoctors, setAllDoctors] = useState(() => [])
    const [doctorsCount, setDoctorsCount] = useState()
    const [open, setOpen] = useState(false)

    const [filterFrom, setFilterFrom] = useState({
        age: "",
        ctc: "",
        experience: "",
        department: "",
    })
    const [filterTo, setFilterTo] = useState({
        age: "",
        ctc: "",
        experience: "",
    })
    const [filterFromErr, setFilterFromErr] = useState({
        age: "",
        ctc: "",
        experience: "",
        department: "",
    })
    const [filterToErr, setFilterToErr] = useState({
        age: "",
        ctc: "",
        experience: "",
    })

    const navigate = useNavigate()
    const { search } = useSelector((state) => state.root.admin)

    useEffect(() => {
        getRequest('/admin/get-all-doctors').then(res => {
            setAllDoctors(res.allDoctors)
            setDoctors(res.allDoctors)
            setDoctorsCount(res.totalCount)
        })
    }, [])

    function filter(filterFrom, filterTo) {
        let filteredDoctors = allDoctors
        if (filterFrom?.department != "") {
            filteredDoctors = filteredDoctors.filter(item => item?.department == filterFrom?.department)
        }
        if (filterFrom?.age != "") {
            filteredDoctors = filteredDoctors.filter(item => item?.age >= filterFrom?.age && item?.age <= filterTo.age)
        }
        if (filterFrom?.ctc != "") {
            filteredDoctors = filteredDoctors.filter(item => item?.CTC >= filterFrom?.ctc && item?.CTC <= filterTo.ctc)
        }
        if (filterFrom?.experience != "") {
            filteredDoctors = filteredDoctors.filter(item => item?.experience >= filterFrom?.experience && item?.experience <= filterTo.experience)
        }
        setOpen(false)

        setDoctors(filteredDoctors)
    }
    function clearFilter() {
        setDoctors(allDoctors)
    }

    function blockDoctor(id) {
        getRequest(`/admin/block-doctor/${id}`).then(res => {
            setDoctors(prev => {
                return prev.filter(doctor => {
                    if (doctor._id == id) {
                        doctor.block = !doctor.block;
                    }
                    return doctor
                })
            })
        })
    }

    return (
        <div className='admin-doctors-list-page'>
            {open &&
                <div className="filter-background">
                    <Filter filter={filter} setOpen={setOpen}  filterFrom={filterFrom} setFilterFrom={setFilterFrom} filterTo={filterTo} setFilterTo={setFilterTo} filterFromErr={filterFromErr} setFilterFromErr={setFilterFromErr} filterToErr={filterToErr} setFilterToErr={setFilterToErr}/>
                </div>
            }
            <div className="header">
                <div className="header-child">
                    <h1>All Doctors</h1>
                    <span onClick={() => setOpen(true)}><img src={filterIcon} alt="" />filter</span>
                    <span onClick={clearFilter}>clear filter</span>
                </div>
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
                        <div className="header__item">
                            <a id="total" className="filter__link filter__link--number" href="#">Edit</a>
                            <a id="total" className="filter__link filter__link--number" href="#">Block</a></div>
                    </div>
                    <div className="table-content">
                        <div className="table-contents">
                            {search ?
                                doctors.map((doctor, i) => {
                                    if (i >= count && i <= count + 9) {
                                        if (!doctor?.username.startsWith(search, 0)) return
                                        else return (<div className="table-row" key={i}>
                                            <div className="table-data">#{i + 1}</div>
                                            <div className="table-data">{doctor?.username}</div>
                                            <div className="table-data">{doctor?.email}</div>
                                            <div className="table-data">{doctor?.mobile}</div>
                                            <div className="table-data">{doctor?.age}</div>
                                            <div className="table-data">{doctor?.CTC}</div>
                                            <div className="table-data">{doctor?.experience}</div>
                                            <div className="table-data">{doctor?.department}</div>
                                            <div className="table-data">
                                                <img src={editIcon} onClick={() => {
                                                    navigate('/admin/doctors/editDoctor', { state: { doctor: doctor?._id } })
                                                }} alt="" />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span>
                                                    <span onClick={() => blockDoctor(doctor?._id)} className={`${!doctor?.block ? 'switch-off' : ''} switch`}><span className={`${doctor?.block ? 'left' : 'right'}`}></span></span>
                                                </span>
                                            </div>
                                        </div>
                                        )
                                    }
                                }) :
                                doctors.map((doctor, i) => {
                                    if (i >= count && i <= count + 9) {
                                        return <div className="table-row" key={i}>
                                            <div className="table-data">#{i + 1}</div>
                                            <div className="table-data">{doctor?.username}</div>
                                            <div className="table-data">{doctor?.email}</div>
                                            <div className="table-data">{doctor?.mobile}</div>
                                            <div className="table-data">{doctor?.age}</div>
                                            <div className="table-data">{doctor?.CTC}</div>
                                            <div className="table-data">{doctor?.experience}</div>
                                            <div className="table-data">{doctor?.department}</div>
                                            <div className="table-data">
                                                <img src={editIcon} onClick={() => {
                                                    navigate('/admin/doctors/editDoctor', { state: { doctor: doctor?._id } })
                                                }} alt="" />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span>
                                                    <span onClick={() => blockDoctor(doctor?._id)} className={`${!doctor?.block ? 'switch-off' : ''} switch`}><span className={`${doctor?.block ? 'left' : 'right'}`}></span></span>
                                                </span>
                                            </div>
                                        </div>
                                    } else {
                                        return null
                                    }
                                })}
                        </div>
                        {doctors.length > 11 ?
                            <div className="actions">
                                <button onClick={() => {
                                    if (count <= 0) {
                                        setCount(0)
                                    } else {
                                        setCount(count - 9)
                                    }
                                }}>&lt;</button>
                                {doctors.map((item, i) => {
                                    if (i % 9 == 0) {
                                        return <span className={i == count ? 'selected' : ''} onClick={() => setCount(i)}>{i / 9 + 1}</span>
                                    }
                                }
                                )}
                                <button onClick={() => {
                                    if (count + 9 >= doctors.length) {
                                        setCount(count)
                                    } else {
                                        setCount(count + 9)
                                    }
                                }}>&gt;</button>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDoctorsList
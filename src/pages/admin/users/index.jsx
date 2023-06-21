import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch';

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'
import filterIcon from '../../../assets/images/filter.png'

import './style.scss'
import { useSelector } from 'react-redux';
import UserFilter from '../../../components/adminComponents/userFilter';

const getRequest = useFetch("GET");

function AllUser() {
    const { search } = useSelector((state) => state.root.admin)

    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [open, setOpen] = useState(false)

    const [filterFrom, setFilterFrom] = useState({
        gender: "",
        dateOfBirth: "",
    })
    const [filterTo, setFilterTo] = useState({
        gender: "",
        dateOfBirth: "",
    })
    const [filterFromErr, setFilterFromErr] = useState({
        gender: "",
        dateOfBirth: "",
    })
    const [filterToErr, setFilterToErr] = useState({
        gender: "",
        dateOfBirth: "",
    })

    useEffect(() => {
        getRequest('/admin/get-all-users').then(response => {
            setUsers(response.users);
            setAllUsers(response.users);
        })
    }, [])

    function blockUser(id) {
        getRequest(`/admin/block-user/${id}`).then(response => {
            if (response.ok) {
                setUsers(prev => {
                    return prev.filter(item => {
                        if (item._id == id) {
                            item.block = !item.block
                        }
                        return item
                    })
                });
            }
        })
    }

    function filter(filterFrom, filterTo) {
        let filteredUsers = allUsers
        if (filterFrom?.patientsCount != "") {
            filteredUsers = filteredUsers.filter(item => item?.gender >= filterFrom?.gender && item?.gender <= filterTo.gender)
        }
        if (filterFrom?.doctorsCount != "") {
            filteredUsers = filteredUsers.filter(item => item?.dateOfBirth >= filterFrom?.dateOfBirth && item?.dateOfBirth <= filterTo.dateOfBirth)
        }
        setOpen(false)
        setUsers(filteredUsers)
    }

    function clearFilter() {
        setUsers(allUsers)
    }

    return (
        <div className='admin-all-user-list'>
            {open &&
                <div className="filter-background">
                    <UserFilter filter={filter} setOpen={setOpen} filterFrom={filterFrom} setFilterFrom={setFilterFrom} filterTo={filterTo} setFilterTo={setFilterTo} filterFromErr={filterFromErr} setFilterFromErr={setFilterFromErr} filterToErr={filterToErr} setFilterToErr={setFilterToErr} />
                </div>
            }
            <div className="all-patients">
                <div className="patients">
                    <div className="header-child">
                        <h2>All Users</h2>
                        <span onClick={() => setOpen(true)}><img src={filterIcon} alt="" />filter</span>
                        <span onClick={clearFilter}>clear filter</span>
                    </div>
                    <div className="container">
                        <div className="table">
                            <div className="table-header">
                                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">ID</a></div>
                                <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
                                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">DOB</a></div>
                                <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">email</a></div>
                                <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">gender</a></div>
                                <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">mobile</a></div>
                                <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Block User</a></div>
                            </div>
                            <div className="table-content">
                                <div className="table-contents">
                                    {search ? users && users.map((user, i) => {
                                        if (!user.firstName.startsWith(search, 0)) {
                                            return
                                        } else {
                                            const { _id: id, firstName, lastName, email, dateOfBirth, gender, block, mobile, } = user;
                                            console.log(block);
                                            return <div className="table-row" key={id}>
                                                <div className="table-data"># {i + 1}</div>
                                                <div className="table-data">{firstName + " " + lastName}</div>
                                                <div className="table-data">{dateOfBirth}</div>
                                                <div className="table-data">{email}</div>
                                                <div className="table-data">{gender}</div>
                                                <div className="table-data">{mobile}</div>
                                                <div className="table-data">
                                                    <span>
                                                        <span onClick={() => blockUser(id)} className={`${!block ? 'switch-off' : ''} switch`}><span className={`${block ? 'left' : 'right'}`}></span></span>
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                    }) : users && users.map((user, i) => {
                                        console.log(user);
                                        const { _id: id, firstName, lastName, email, dateOfBirth, gender, block, mobile, } = user;
                                        console.log(block);
                                        return <div className="table-row" key={id}>
                                            <div className="table-data"># {i + 1}</div>
                                            <div className="table-data">{firstName + " " + lastName}</div>
                                            <div className="table-data">{dateOfBirth}</div>
                                            <div className="table-data">{email}</div>
                                            <div className="table-data">{gender}</div>
                                            <div className="table-data">{mobile}</div>
                                            <div className="table-data">
                                                <span>
                                                    <span onClick={() => blockUser(id)} className={`${!block ? 'switch-off' : ''} switch`}><span className={`${block ? 'left' : 'right'}`}></span></span>
                                                </span>
                                            </div>
                                        </div>
                                    })}
                                </div>
                                {users.length > 11 ?
                                    <div className="actions">
                                        <button>&lt;</button>
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <button>&gt;</button>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AllUser
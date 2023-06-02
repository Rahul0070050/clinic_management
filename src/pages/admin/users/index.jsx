import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch';

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'

import './style.scss'
import { useSelector } from 'react-redux';

const getRequest = useFetch("GET");

function AllUser() {
    const { search } = useSelector((state) => state.root.admin)

    const [users, setUsers] = useState([])
    useEffect(() => {
        getRequest('/admin/get-all-users').then(response => {
            setUsers(response.users);
            console.log(response.users);
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

    return (
        <div className='admin-all-user-list'>
            <div className="all-patients">
                <div className="patients">
                    <h2>All Users</h2>
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
import React, { useEffect, useState } from 'react'

import './style.scss'
import Prescription from '../../../components/componests/prescription';
import useFetch from '../../../hooks/useFetch';

const getRequest = useFetch("GET")

function UserProfile() {
    const [user, setUser] = useState({})
    const [history, setHistory] = useState([])
    useEffect(() => {
        getRequest(`/user/get-profile`).then(res => {
            setUser(res.user)
            console.log(res.history);
            setHistory(res.history)
        })
    }, [])
    return (
        <div className='user-Profile'>
            <div className="user-info">
                <h2 className='user-info-header'>user info</h2>
                <div className="info">
                    <div className="keys">
                        <span>name</span>
                        <span>email</span>
                        <span>mobile</span>
                        <span>gender</span>
                        <span>dob</span>
                    </div>
                    <div className="values">
                        <span>{user?.firstName + " " + user?.lastName}</span>
                        <span>{user?.email}</span>
                        <span>{user?.mobile}</span>
                        <span>{user?.gender}</span>
                        <span>{user?.dateOfBirth}</span>
                    </div>
                </div>
            </div>
            <div className="user-history">
                <div className='header'>
                    <h1>History</h1>
                </div>
                <div className="container">
                    {history ? history?.map(item => {
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
                                    <h2>Symptoms</h2>
                                    <br />
                                    <span className='symptoms'>{item?.symptoms}</span>
                                    <br />
                                    <br />
                                    <h2>Prescription</h2>
                                </div>
                                <div className="body">
                                    <Prescription prescriptions={item?.prescription} />
                                </div>
                            </div>
                        </div>
                    })
                        :
                        <div className='no-history-available'>No History</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfile
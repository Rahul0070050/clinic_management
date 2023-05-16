import React, { useEffect } from 'react'

import useFetch from '../../../hooks/useFetch';

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'

import './style.scss'

const getRequest = useFetch("GET");

function AllPatientsList() {
    useEffect(() => {
        getRequest('admin/get-all-patients').then(response => {
            console.log(response);
        })
    }, [])

    return (
        <div className='admin-all-patients-list'>
            <div className="all-patients">
                <div className="patients">
                    <h2>All Appointments</h2>
                    <div className="container">
                        <div className="table">
                            <div className="table-header">
                                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">ID</a></div>
                                <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
                                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">Time</a></div>
                                <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">Date</a></div>
                                <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Phone</a></div>
                                <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Actions</a></div>
                            </div>
                            <div className="table-content">
                                <div className="table-row">
                                    <div className="table-data">#2234</div>
                                    <div className="table-data">Tom</div>
                                    <div className="table-data">12:30</div>
                                    <div className="table-data">23/12/2023</div>
                                    <div className="table-data">1349852349</div>
                                    <div className="table-data">
                                        <span>
                                            <img src={editIcon} alt="" />
                                            <img src={deleteIcon} alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            </div>
        </div>
    )
}

export default AllPatientsList
import React, { useState } from 'react'

import './style.scss'

import crossIcon from '../../../assets/images/cross.png'

function DepartmentFilter({ setOpen, filter, filterFrom, setFilterFrom, filterTo, setFilterTo, filterFromErr, setFilterFromErr, filterToErr, setFilterToErr }) {

    function handleOnChangeFilterFrom(e) {
        setFilterFrom(prev => {
            const check = /[0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
            switch (e.target.name) {
                case "department":
                    if (!check.test(e.target.value)) {
                        return {
                            ...prev,
                            [e.target.name]: e.target.value
                        }
                    }
                    return {
                        ...prev,
                    }
                default:
                    return {
                        ...prev,
                        [e.target.name]: e.target.value
                    }
            }
        })
    }
    function handleOnChangeFilterTo(e) {
        setFilterTo(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function submit() {
        if ((filterFrom.doctorsCount != "" || filterTo.doctorsCount == "") || (filterFrom.doctorsCount == "" || filterTo.doctorsCount == "")) {

        }
        if ((filterFrom.patientsCount != "" || filterTo.patientsCount == "") || (filterFrom.patientsCount == "" || filterTo.patientsCount == "")) {

        }
        filter(filterFrom, filterTo)
    }

    return (
        <div className='filter-modal'>
            <div className="heading">
                <h1>Filter</h1>
                <img src={crossIcon} onClick={() => setOpen(false)} alt="" />
            </div>
            <div className="from-to">

            </div>
            <div className="body">
                <h3>
                    Doctors Count
                    <div className="inputs">
                        <div className="from">
                            <input type="number" style={{ borderColor: `${filterFromErr.department ? 'red' : ''}` }} placeholder="from" name='department' value={filterFrom.department} onChange={handleOnChangeFilterFrom} />
                        </div>
                        <div className="to">
                            <input type="number" style={{ borderColor: `${filterToErr.department ? 'red' : ''}` }} placeholder="to" name='department' value={filterTo.age} onChange={handleOnChangeFilterTo} />
                        </div>
                    </div>
                </h3>
                <h3>
                    Patients Count
                    <div className="inputs">
                        <div className="from">
                            <input type="number" style={{ borderColor: `${filterFromErr.patientsCount ? 'red' : ''}` }} placeholder="from" name='patientsCount' value={filterFrom.patientsCount} onChange={handleOnChangeFilterFrom} />
                        </div>
                        <div className="to">
                            <input type="number" style={{ borderColor: `${filterToErr.patientsCount ? 'red' : ''}` }} placeholder="to" name='patientsCount' value={filterTo.patientsCount} onChange={handleOnChangeFilterTo} />
                        </div>
                    </div>
                </h3>
                <div className="action">
                    <button onClick={submit}>Filter</button>
                </div>
            </div>
        </div>
    )
}

export default DepartmentFilter
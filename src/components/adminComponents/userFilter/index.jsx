import React, { useState } from 'react'

import './style.scss'

import crossIcon from '../../../assets/images/cross.png'

function UserFilter({ setOpen, filter, filterFrom, setFilterFrom, filterTo, setFilterTo, filterFromErr, setFilterFromErr, filterToErr, setFilterToErr }) {

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
        if ((filterFrom.gender == "")) {

        }
        if ((filterFrom.dateOfBirth != "" || filterTo.dateOfBirth == "") || (filterFrom.dateOfBirth == "" || filterTo.dateOfBirth == "")) {

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
                    DOB
                    <div className="inputs">
                        <div className="from">
                            <input type="number" style={{ borderColor: `${filterFromErr.dateOfBirth ? 'red' : ''}` }} placeholder="from" name='dateOfBirth' value={filterFrom.dateOfBirth} onChange={handleOnChangeFilterFrom} />
                        </div>
                        <div className="to">
                            <input type="number" style={{ borderColor: `${filterToErr.dateOfBirth ? 'red' : ''}` }} placeholder="to" name='age' value={filterTo.dateOfBirth} onChange={handleOnChangeFilterTo} />
                        </div>
                    </div>
                </h3>
                <h3>
                    dateOfBirth
                    <div className="inputs">
                        <div className="from">
                            <input type="number" style={{ borderColor: `${filterFromErr.gender ? 'red' : ''}` }} placeholder="from" name='gender' value={filterFrom.gender} onChange={handleOnChangeFilterFrom} />
                        </div>
                        <div className="to">
                            <input type="number" style={{ borderColor: `${filterToErr.gender ? 'red' : ''}` }} placeholder="to" name='gender' value={filterTo.gender} onChange={handleOnChangeFilterTo} />
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

export default UserFilter
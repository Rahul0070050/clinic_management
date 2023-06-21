import React, { useState } from 'react'

import './style.scss'

import crossIcon from '../../../assets/images/cross.png'

function Filter({ setOpen, filter, filterFrom, setFilterFrom, filterTo, setFilterTo, filterFromErr, setFilterFromErr, filterToErr, setFilterToErr }) {

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
        if ((filterFrom.age != "" || filterTo.age == "") || (filterFrom.age == "" || filterTo.age == "")) {

        }
        if ((filterFrom.ctc != "" || filterTo.ctc == "") || (filterFrom.ctc == "" || filterTo.ctc == "")) {

        }
        if ((filterFrom.experience != "" || filterTo.experience == "") || (filterFrom.experience == "" || filterTo.experience == "")) {

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
                    AGE
                    <div className="inputs">
                        <div className="from">
                            <input type="number" style={{ borderColor: `${filterFromErr.age ? 'red' : ''}` }} placeholder="from" name='age' value={filterFrom.age} onChange={handleOnChangeFilterFrom} />
                        </div>
                        <div className="to">
                            <input type="number" style={{ borderColor: `${filterToErr.age ? 'red' : ''}` }} placeholder="to" name='age' value={filterTo.age} onChange={handleOnChangeFilterTo} />
                        </div>
                    </div>
                </h3>
                <h3>
                    CTC
                    <div className="inputs">
                        <div className="from">
                            <input type="number" style={{ borderColor: `${filterFromErr.ctc ? 'red' : ''}` }} placeholder="from" name='ctc' value={filterFrom.ctc} onChange={handleOnChangeFilterFrom} />
                        </div>
                        <div className="to">
                            <input type="number" style={{ borderColor: `${filterToErr.ctc ? 'red' : ''}` }} placeholder="to" name='ctc' value={filterTo.ctc} onChange={handleOnChangeFilterTo} />
                        </div>
                    </div>
                </h3>
                <h3>
                    EXPERIENCE
                    <div className="inputs">
                        <div className="from">
                            <input type="number" style={{ borderColor: `${filterFromErr.experience ? 'red' : ''}` }} placeholder="from" name='experience' value={filterFrom.experience} onChange={handleOnChangeFilterFrom} />
                        </div>
                        <div className="to">
                            <input type="number" style={{ borderColor: `${filterToErr.experience ? 'red' : ''}` }} placeholder="to" name='experience' value={filterTo.experience} onChange={handleOnChangeFilterTo} />
                        </div>
                    </div>
                </h3>
                <h3>
                    DEPARTMENT
                    <div className="inputs">
                        <div className="department">
                            <input type="text" style={{ borderColor: `${filterToErr.department ? 'red' : ''}` }} placeholder="department" name='department' value={filterFrom.department} onChange={handleOnChangeFilterFrom} />
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

export default Filter
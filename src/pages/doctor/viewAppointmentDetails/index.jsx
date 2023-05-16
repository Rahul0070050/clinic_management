import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'

import siteLogo from '../../../assets/svg/site-logo.svg'
import plusButton from '../../../assets/svg/plus-image.svg'
import './style.scss'

function ViewAppointmentDetails() {
    const getRequest = useFetch("GET")
    const postRequest = useFetch("POST")
    const location = useLocation()

    const [medicine, setMedicine] = useState([{ medicine: '', morning: '0', noon: '0', night: '0' }])
    const [medicineErr, setMedicineErr] = useState([{ medicine: false, morning: false, noon: false, night: false }])
    const [appointmentInfo, setAppointmentInfo] = useState({})
    const [symptoms, setSymptoms] = useState('')
    const [symptomsErr, setSymptomsErr] = useState(false)
    useEffect(() => {
        getRequest(`/doctor/get-appointment-info/${location.state.id}`).then(res => {
            console.log(res);
            setAppointmentInfo(res?.info)
        })
    }, [])

    function onHandleChange(e, index) {
        if (e.target.name == "morning" && e.target.value.length > 1) return;
        if (e.target.name == "noon" && e.target.value.length > 1) return;
        if (e.target.name == "night" && e.target.value.length > 1) return;

        setMedicine((prev) => {
            let prevCopy = [...prev]
            prevCopy[index][e.target.name] = e.target.value
            return prevCopy;
        });
    }

    function addField() {
        setMedicineErr((prev => {
            return [...prev, { medicine: false, morning: false, noon: false, night: false }]
        }))
        setMedicine((prev => {
            return [...prev, { medicine: '', morning: '0', noon: '0', night: '0' }]
        }))
    }

    function removeFieldHandler() {
        if (medicine.length <= 1) return;
        setMedicineErr((prev => {
            prev.pop()
            return [...prev]
        }))
        setMedicine((prev => {
            prev.pop()
            return [...prev]
        }))
    }

    function submitHandler() {
        let flag = false;
        for (let index = 0; index < medicine.length; index++) {
            for (const key in medicine[index]) {
                if (medicine[index][key] == "") {
                    flag = true
                    setMedicineErr(prev => {
                        return [
                            ...prev,
                            prev[index][key] = true
                        ]
                    })
                } else {
                    setMedicineErr(prev => {
                        return [
                            ...prev,
                            prev[index][key] = false
                        ]
                    })
                }
            }
        }

        if (symptoms == "") {
            setSymptomsErr(true)
            flag = true
        }

        if (flag) return

        const body = {
            medicine,
            symptoms,
            appointmentInfo
        }

        postRequest('/doctor/add-prescription', body).then(res => {
            console.log(res);
            if(res.ok) {
                window.location = "/doctor/appointments"
            }
        })

    }
    console.log(appointmentInfo);
    return (
        <div className='doctor-appointment-info'>
            <div className="appointment-info">
                <div className="info">
                    <div className="header">
                        <div className="image">
                            <img src={siteLogo} alt="" />
                            <h2>skin care</h2>
                        </div>
                        <p>skincare clinic, W8PH+R35, Maradu(P.O), <br /> Mangayil School Road, Maradu, Ernakulam, Kerala 682304</p>
                    </div>
                    <div className="body">
                        <div className="patient">
                            <div className="fields">
                                <span>name</span>
                                <span>age</span>
                                <span>gender</span>
                                <span>DOB</span>
                            </div>
                            <div className="values">
                                <span>{appointmentInfo.firstName + " " + appointmentInfo.lastName}</span>
                                <span>{appointmentInfo.age}</span>
                                <span>{appointmentInfo.gender}</span>
                                <span>{appointmentInfo.dob}</span>
                            </div>
                        </div>
                        <div className="doctor">
                            <div className="fields">
                                <span>name</span>
                                <span>department</span>
                                <span>time</span>
                                <span>date</span>
                            </div>
                            <div className="values">
                                <span>{appointmentInfo.doctorName}</span>
                                <span>{appointmentInfo.department}</span>
                                <span>{appointmentInfo.appointmentTime}</span>
                                <span>{new Date(appointmentInfo.appointmentDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="symptoms">
                        <label htmlFor="symptoms">symptoms</label>
                        <textarea name="symptoms" style={{ border: symptomsErr ? '2px solid red' : '' }} value={symptoms} onChange={({ target: { value } }) => setSymptoms(value)} id="symptoms" cols="30" rows="5"></textarea>
                    </div>
                    <div className="prescription">
                        <div className="keys">
                            <h4>medicine name</h4>
                            {medicine.map((item, i) => <input key={i} type="text" style={{ border: medicineErr[i].medicine ? '2px solid red' : '' }} name="medicine" value={item.medicine} onChange={(e) => onHandleChange(e, i)} id="medicine" />)}
                        </div>
                        <div className="values">
                            <div className="time-1">
                                <h4>Morning</h4>
                                {medicine.map((item, i) => <input key={i} type="number" max={9} min={0} style={{ border: medicineErr[i].morning ? '2px solid red' : '' }} name="morning" value={item.morning} onChange={(e) => onHandleChange(e, i)} id="morning" />)}
                            </div>
                            <div className="time-2">
                                <h4>Noon</h4>
                                {medicine.map((item, i) => <input key={i} type="number" max={9} min={0} style={{ border: medicineErr[i].noon ? '2px solid red' : '' }} name="noon" value={item.noon} onChange={(e) => onHandleChange(e, i)} id="noon" />)}
                            </div>
                            <div className="time-3">
                                <h4>Night</h4>
                                {medicine.map((item, i) => <input key={i} type="number" max={9} min={0} style={{ border: medicineErr[i].night ? '2px solid red' : '' }} name="night" value={item.night} onChange={(e) => onHandleChange(e, i)} id="night" />)}
                            </div>
                        </div>
                        <img onClick={addField} src={plusButton} alt="" />
                        <h1 onClick={removeFieldHandler}>-</h1>
                    </div>
                </div>
                <div className="btn">
                    <button onClick={submitHandler} type='button'>submit</button>
                </div>
            </div>
        </div>
    )
}

export default ViewAppointmentDetails
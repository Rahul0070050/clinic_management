import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch';
import { slotTimes } from '../../../util/slotsTimes';

const getRequest = useFetch('GET');

import './style.scss'

function ClientSlotsBooking() {
    const today = new Date()
    const [providedSlots, setProvidedSlots] = useState([])
    const [selectedSlot, setSelectedSlot] = useState("")
    const [selectedDate, setSelectedDate] = useState(today.toLocaleDateString())
    const [selectedDoctors, setSelectedDoctors] = useState([])
    const [slots, setSlots] = useState([])
    const [doctors, setDoctors] = useState([])
    const [departments, setDepartments] = useState([])



    const [dates, setDate] = useState(() => {
        let today = new Date()
        let dates = []
        for (let i = 0; i < 7; i++) {
            let weekday = today.toLocaleString("default", { weekday: "short" })
            if (weekday === "Sat") {
                today.setDate(today.getDate() + 2)
                weekday = today.toLocaleString("default", { weekday: "short" })
            }
            dates.push({ date: today.toLocaleDateString(), weekday })
            today.setDate(today.getDate() + 1)
        }

        return dates
    })

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        gender: "",
        dob: "",
        appointmentTime: "",
        appointmentDate: "",
        doctorName: "",
        department: "",
        age: "",
        address: "",
    })

    useEffect(() => {
        getRequest('/user/get-slots').then(response => {
            setProvidedSlots(response.slots)
            setSlots(() => {
                let todaysSlots = response.slots.find(slot => {
                    if (new Date(slot.date).toLocaleDateString() == today.toLocaleDateString()) {
                        return slot
                    }
                })
                if (todaysSlots?.length <= 0) {
                    return slotTimes
                } else {
                    return todaysSlots.times
                }

            })
        }).catch(err => console.log(err))

        getRequest('/user/get-all-doctors').then(res => {
            let departments = []
            setDoctors(() => {
                let doctors = res.doctors.map(doctor => {
                    if (!departments.includes(doctor.department)) departments.push(doctor.department)
                    setSlots((prev) => prev.filter(slot => {
                        if (slot.doctor == doctor.username) {
                            slot.department = doctor.department
                        }
                        return slot
                    }))
                    return {
                        doctor: doctor.username,
                        department: doctor.department
                    }
                })
                return doctors
            })
            setDepartments(departments)
        })
    }, [])

    function handleSlotSelect(slot) {
        console.log(slot);
        if (selectedSlot?.time == slot.time) {
            setFormData(prev => {
                return {
                    ...prev,
                    department: "",
                    doctorName: ""
                }
            })
            setSelectedSlot({})
        } else {
            setFormData(prev => {
                return {
                    ...prev,
                    department: slot.doctor,
                    doctorName: slot.department
                }
            })
            setSelectedSlot(slot)
        }
    }

    function handleDateSelect(date) {
        setSelectedDate(date)
        setSlots(() => {
            let todaysSlots = providedSlots.find(slot => {
                if (new Date(slot.date).toLocaleDateString() == date) {
                    return slot
                }
            })
            setSelectedSlot({})
            if (todaysSlots) {
                return todaysSlots.times.filter(slot => {
                    doctors.map(doc => {
                        if (doc.doctor == slot.doctor) {
                            slot.department = doc.department
                            return
                        }
                    })
                    return slot
                })
            } else {
                return slotTimes
            }

        })
    }

    function handleOnchange(e) {
        if (e.target.name == "department") {
            setSelectedDoctors(() => {
                return doctors.filter(doctor => doctor.department == e.target.value)
            })
        }
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


    return (
        <div className='client-slots-booking'>
            <div className="slots">
                <h1>Book A Slot</h1>
                <div className="dates">
                    {dates.map(date => {
                        return <span key={date.date} onClick={() => handleDateSelect(date.date)} className={`${selectedDate == date.date ? 'selected' : ''}`}>{date.date}</span>
                    })}
                </div>
                <div className="times">
                    {slots && slots.map(slot => {
                        console.log(doctors[0]?.department == slot.department);
                        return <div key={slot.time} onClick={() => handleSlotSelect(slot)} className={`slot ${slot.time == selectedSlot?.time ? 'clicked' : ''} ${!slot.selected && 'not-available'} ${formData.department == slot.department && 'suggestion'}`}>{slot.time}</div>
                    })}
                </div>
            </div>
            <div className="appointment-form">
                <form>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="firstName">firstName</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleOnchange} id="firstName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">LastName</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleOnchange} id="lastName" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="email">email</label>
                            <input type="text" name="email" value={formData.email} onChange={handleOnchange} id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">mobile</label>
                            <input type="text" name="mobile" value={formData.mobile} onChange={handleOnchange} id="mobile" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">gender</label>
                            <select name="gender" onChange={handleOnchange} id="gender">
                                <option value="">CHOSE</option>
                                <option value="male">MALE</option>
                                <option value="female">FEMALE</option>
                                <option value="other">OTHER</option>
                            </select>
                            <input type="text" name="gender" value={formData.gender} onChange={handleOnchange} id="gender" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="dob">dob</label>
                            <input type="text" name="dob" value={formData.dob} onChange={handleOnchange} id="dob" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="appointmentTime">appointmentTime</label>
                            <input type="text" name="appointmentTime" value={formData.appointmentTime} onChange={handleOnchange} id="appointmentTime" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="appointmentDate">appointmentDate</label>
                            <input type="text" name="appointmentDate" value={formData.appointmentDate} onChange={handleOnchange} id="appointmentDate" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="department">department</label>
                            <select name="department" onChange={handleOnchange} id="department">
                                <option value="">select</option>
                                {departments.map((department, i) => {
                                    return <option key={i} value={department}>{department}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="doctorName">doctorName</label>
                            <select name="doctorName" onChange={handleOnchange} id="doctorName">
                                <option value="">select</option>
                                {selectedDoctors.map((doctor, i) => {
                                    return <option key={i} value={doctor.doctor}>{doctor.doctor}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">age</label>
                            <input type="text" name="age" value={formData.age} onChange={handleOnchange} id="age" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="address">address</label>
                            <textarea rows={4} name="address" value={formData.address} onChange={handleOnchange} id="address" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <input type="button" value="submit" id="" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ClientSlotsBooking
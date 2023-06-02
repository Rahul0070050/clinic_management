import React, { useEffect, useState } from 'react'
import jwt from 'jwt-decode'

import useFetch from '../../../hooks/useFetch';
import { slotTimes } from '../../../util/slotsTimes';
import { checkMobileNumberHasAnyCharacter, checkPasswordHasSpecialCharacters, checkStringHasSpecialCharactersOrNumbers } from '../../../util/utilFunnctions';

const getRequest = useFetch('GET');
const postRequest = useFetch('POST');

import './style.scss'

function ClientSlotsBooking() {
    const today = new Date()
    const [providedSlots, setProvidedSlots] = useState([])
    const [selectedSlot, setSelectedSlot] = useState("")
    const [selectedDoctors, setSelectedDoctors] = useState([])
    const [slots, setSlots] = useState([])
    const [doctors, setDoctors] = useState([])
    const [departments, setDepartments] = useState([])
    const [selectedDepartments, setSelectedDepartments] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedGlobalDate, setSelectedGlobalDate] = useState('')
    const [user, setUser] = useState({})
    // const [user, setAge] = useState(null)
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    var month = today.getMonth() + 1;
    var day = today.getDate();
    var year = today.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    // useEffect(() => {
    //     getRequest('/')
    // }, [])

    var maxDate = year + '-' + month + '-' + day;
    const [dates, setDate] = useState(() => {
        let today = new Date()

        let dates = []
        for (let i = 0; i < 7; i++) {
            let weekday = today.toLocaleString("default", { weekday: "short" })
            if (weekday === "Sat") {
                today.setDate(today.getDate() + 2)
                weekday = today.toLocaleString("default", { weekday: "short" })
            } else if (weekday == "Sun") {
                today.setDate(today.getDate() + 1)
                weekday = today.toLocaleString("default", { weekday: "short" })
            }
            dates.push({ date: today.toLocaleDateString(), weekday })
            today.setDate(today.getDate() + 1)
        }
        setSelectedDate(dates[0].date)

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

    const [formDataError, setFormDataError] = useState({
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
                    if (new Date(slot.date).toLocaleDateString() == dates[0].date) {
                        return slot
                    }
                })

                setUser(() => {
                    let user = jwt(localStorage.getItem('user-token'))?._doc
                    let year = user?.dateOfBirth.slice(0, 4)
                    console.log(user);
                    setFormData(prev => {
                        return {
                            ...prev,
                            dob: user.dateOfBirth,
                            email: user.email,
                            firstName: user.firstName,
                            gender: user.gender,
                            lastName: user.lastName,
                            mobile: user.mobile,
                            age: new Date().getFullYear() - Number(year) == 0 ? 1 : new Date().getFullYear() - Number(year)
                        }
                    })
                    return { ...user, age: new Date().getFullYear() - Number(year) };
                })
                if (todaysSlots?.times?.length) {
                    setSelectedGlobalDate(todaysSlots?.date)
                    return todaysSlots?.times
                } else {
                    setSelectedGlobalDate(dates[0].date)
                    return slotTimes
                }
            })
        }).catch(err => console.log(err))

        getRequest('/user/get-all-doctors').then(res => {
            let departments = []
            console.log(res);
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
            console.log(departments);
            setDepartments(departments)
        })
    }, [dates])

    function handleSlotSelect(slot) {
        let date = selectedDate.split('/')

        if (selectedSlot?.time == slot.time) {
            setFormData(prev => {
                return {
                    ...prev,
                    department: "",
                    doctorName: "",
                    appointmentTime: "",
                    appointmentDate: ""
                }
            })
            setSelectedSlot({})
        } else {
            setFormData(prev => {
                return {
                    ...prev,
                    department: slot.department,
                    doctorName: slot.doctor,
                    appointmentTime: slot.time,
                    appointmentDate: new Date(selectedGlobalDate)
                }
            })
            setSelectedSlot(slot)
        }
    }

    function handleDateSelect(date) {
        setFormData(prev => {
            return {
                ...prev,
                department: "",
                doctorName: ""
            }
        })
        setSelectedDate(date)
        setSlots(() => {
            let todaysSlots = providedSlots.find(slot => {
                if (new Date(slot.date).toLocaleDateString() == date) {
                    return slot
                }
            })
            setSelectedSlot({})
            if (todaysSlots) {
                setSelectedGlobalDate(todaysSlots?.date)
                return todaysSlots?.times?.filter(slot => {
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

    function paymentHandler() {
        if (!formValidation()) {
            var options = {
                key: import.meta.env.VITE_KEY_ID,
                key_secret: import.meta.env.VITE_SECRET_KEY,
                amount: 40 * 100,
                currency: "INR",
                name: "STARTUP_PROJECTS",
                description: "for testing purpose",
                handler: function (response) {
                    if (response) {
                        setPaymentSuccess(true)
                        submitHandler()
                    }
                },
                prefill: {
                    name: "Velmurugan",
                    email: "mvel1620r@gmail.com",
                    contact: "7904425033"
                },
                notes: {
                    address: "Razorpay Corporate office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            var pay = new window.Razorpay(options);
            pay.open();
        }
    }


    function handleOnchange(e) {
        if (e.target.name == "department") {
            setSelectedDepartments(e.target.value)
            setSelectedDoctors(() => {
                return doctors.filter(doctor => doctor.department == e.target.value)
            })
        }
        if (e.target.name == "age" && (Number(e.target.value) > 99 || Number(e.target.value) <= 0)) {
            return
        }
        console.log(e.target.value);
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function formValidation() {
        if (formData.firstName == "" || formData.lastName == "" || formData.email == "" || formData.mobile == "" || formData.gender == "" || formData.dob == "" || formData.appointmentTime == "" || formData.appointmentDate == "" || formData.doctorName == "" || formData.department == "" || formData.age == "" || formData.address == "") {
            for (const key in formData) {
                if (formData[key] == "") {
                    setFormDataError((prev) => {
                        return {
                            ...prev,
                            [key]: true
                        }
                    })
                } else {
                    setFormDataError((prev) => {
                        return {
                            ...prev,
                            [key]: false
                        }
                    })
                }
            }
            return true
        } else {
            if (checkStringHasSpecialCharactersOrNumbers(formData.firstName)) {
                setFormDataError(prev => {
                    return {
                        ...prev,
                        firstName: " don't allow special characters or number"
                    }
                })
                return true;
            } else {
                setFormDataError(prev => {
                    return {
                        ...prev,
                        firstName: ""
                    }
                })
            }
            if (checkStringHasSpecialCharactersOrNumbers(formData.lastName)) {
                setFormDataError(prev => {
                    return {
                        ...prev,
                        lastName: " don't allow special characters or number"
                    }
                })
                return true;
            } else {
                setFormDataError(prev => {
                    return {
                        ...prev,
                        lastName: ""
                    }
                })
            }

            for (const key in formData) {
                setFormDataError(prev => {
                    return {
                        ...prev,
                        [key]: ""
                    }
                })
            }
            return false
        }
    }

    function submitHandler() {
        if (formData.firstName == "" || formData.lastName == "" || formData.email == "" || formData.mobile == "" || formData.gender == "" || formData.dob == "" || formData.appointmentTime == "" || formData.appointmentDate == "" || formData.doctorName == "" || formData.department == "" || formData.age == "" || formData.address == "") {
            if (!formValidation()) return
        } else {
            for (const key in formData) {
                setFormDataError((prev) => {
                    return {
                        ...prev,
                        [key]: false
                    }
                })
            }

            postRequest('/user/book-appointment', formData).then(res => {
                console.log(res);
                if (res.ok) {
                    setSlots(prev => {
                        return prev.filter(slot => {
                            if (slot.time == formData.appointmentTime) {
                                console.log(slot);
                                slot.booked = true
                            }
                            return slot
                        })
                    })
                }
            }).catch(err => {
                console.log(err);
                setFormDataError((prev) => {
                    return {
                        ...prev,
                        ...err
                    }
                })
            })
        }
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
                        return <div key={slot.time} onClick={() => handleSlotSelect(slot)} className={`slot ${!slot.selected ? 'not-available' : ''} ${selectedDepartments == slot.department ? 'suggestion' : ''} ${slot.time == selectedSlot?.time ? 'clicked' : ''} ${slot.booked ? 'booked' : ''}`}>{slot.time}</div>
                    })}
                </div>
            </div>
            <div className="appointment-form">
                <form>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="firstName" style={{ color: `${formDataError.firstName ? 'red' : 'gray'}` }}>{formDataError.firstName ? '*' : ''} firstName</label>
                            <input onChange={handleOnchange} type="text" disabled name="firstName" value={formData.firstName} id="firstName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName" style={{ color: `${formDataError.lastName ? 'red' : 'gray'}` }}>{formDataError.lastName ? '*' : ''} LastName</label>
                            <input onChange={handleOnchange} type="text" disabled name="lastName" value={formData.lastName} id="lastName" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="email" style={{ color: `${formDataError.email ? 'red' : 'gray'}` }}>{formDataError.email ? '*' : ''} email</label>
                            <input onChange={handleOnchange} type="text" disabled name="email" value={formData.email} id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile" style={{ color: `${formDataError.mobile ? 'red' : 'gray'}` }}>{formDataError.mobile ? '*' : ''} mobile</label>
                            <input onChange={handleOnchange} type="tel" disabled name="mobile" value={formData.mobile} id="mobile" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender" style={{ color: `${formDataError.gender ? 'red' : 'gray'}` }}>{formDataError.gender ? '*' : ''} gender</label>
                            <input onChange={handleOnchange} name="gender" disabled value={formData.gender} id="gender" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="dob" style={{ color: `${formDataError.dob ? 'red' : 'gray'}` }}>{formDataError.dob ? '*' : ''} dob</label>
                            <input onChange={handleOnchange} name="dob" disabled max={maxDate} value={formData.dob} id="dob" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="appointmentTime" style={{ color: `${formDataError.appointmentTime ? 'red' : 'gray'}` }}>{formDataError.appointmentTime ? '*' : ''} appointmentTime</label>
                            <input type="text" name="appointmentTime" disabled value={formData.appointmentTime} onChange={handleOnchange} id="appointmentTime" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="appointmentDate" style={{ color: `${formDataError.appointmentDate ? 'red' : 'gray'}` }}>{formDataError.appointmentDate ? '*' : ''} appointmentDate</label>
                            <input type="text" name="appointmentDate" disabled value={formData?.appointmentDate && formData?.appointmentDate?.toLocaleDateString()} id="appointmentDate" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="department" style={{ color: `${formDataError.doctorName ? 'red' : 'gray'}` }}>{formDataError.doctorName ? '*' : ''} department</label>
                            <select name="department" onChange={handleOnchange} id="department">
                                <option value={formData.department ? formData.department : ''}>{formData.department ? formData.department : 'select'}</option>
                                {departments.map((department, i) => {
                                    return <option key={i} value={department}>{department}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="doctorName" style={{ color: `${formDataError.department ? 'red' : 'gray'}` }}>{formDataError.department ? '*' : ''} doctorName</label>
                            <select disabled name="doctorName" onChange={handleOnchange} id="doctorName">
                                <option value={formData.doctorName ? formData.doctorName : ''}>{formData.doctorName ? formData.doctorName : 'select'}</option>
                                {selectedDoctors.map((doctor, i) => {
                                    return <option key={i} value={doctor.doctor}>{doctor.doctor}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="age" style={{ color: `${formDataError.age ? 'red' : 'gray'}` }}>{formDataError.age ? '*' : ''} age</label>
                            <input type="number" name="age" disabled value={formData.age} onChange={handleOnchange} id="age" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <label htmlFor="address" style={{ color: `${formDataError.address ? 'red' : 'gray'}` }}>{formDataError.address ? '*' : ''} address</label>
                            <textarea rows={4} name="address" value={formData.address} onChange={handleOnchange} id="address" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="form-group">
                            <input type="button" onClick={paymentHandler} value="submit" id="" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ClientSlotsBooking
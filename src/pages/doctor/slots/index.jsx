import React, { useEffect, useLayoutEffect, useState } from 'react'
import Calendar from 'react-calendar';


import 'react-calendar/dist/Calendar.css';

import './style.scss'
import useFetch from '../../../hooks/useFetch';
import { slotTimes } from '../../../util/slotsTimes';
import swal from 'sweetalert';
import { useJwt } from 'react-jwt';

const postRequest = useFetch('POST');
const getRequest = useFetch('GET');

function DoctorSlots() {

    let maxDay = new Date()
    maxDay.setDate(maxDay.getDate() + 7);

    const { decodedToken, isExpired, reEvaluateToken } = useJwt(JSON.parse(localStorage.getItem('doctor-token')))
    const [selected, setselected] = useState(false)
    const [date, setDate] = useState(() => {
        let date = new Date()
        let weekday = date.toLocaleString("default", { weekday: "short" })
        switch (weekday) {
            case "Sat":
                date.setDate(date.getDate() + 2)
                return date
            case "Sun":
                date.setDate(date.getDate() + 1)
                return date
            default:
                return date
        }
    })

    const [times, setTimes] = useState(slotTimes)

    const [providedDate, setProvidedDate] = useState([])
    const [loading, setLoading] = useState(true)
    const [doctor, setDoctor] = useState("")

    let formData = {

        date: date,
        time: times
    }

    useEffect(() => {
        setDoctor(decodedToken?.response?.username)
    }, [decodedToken])

    useLayoutEffect(() => {
        getRequest('/doctor/get-slots').then(response => {
            setProvidedDate(response.slots);
            let currentProvidedSlots = response.slots.find(item => new Date(item.date).toLocaleDateString() == new Date(date).toLocaleDateString())
            console.log(currentProvidedSlots);
            setTimes(() => {
                if (currentProvidedSlots?.times) {
                    formData.date = new Date(currentProvidedSlots?.date)

                    let jsonCurrentProvidedSlots = JSON.stringify(currentProvidedSlots?.times)
                    jsonCurrentProvidedSlots = JSON.parse(jsonCurrentProvidedSlots)
                    setDate(currentProvidedSlots.date)
                    setLoading(false)
                    return jsonCurrentProvidedSlots.filter(item => {
                        if (!item.selected) {
                            item.doctor = doctor
                        }
                        return item
                    })
                } else {
                    formData.date = new Date(date)
                    formData.date.setUTCHours(0, 0, 0, 0);

                    formData.date.setDate(formData.date.getDate() + 1)
                    setLoading(false)
                    return slotTimes.filter(item => {
                        item.doctor = doctor
                        return item
                    })
                }
            })
        })
    }, [doctor])


    function handleClick(time) {
        setTimes(prev => {
            return prev.filter(item => {
                if (item.time === time) {
                    if (item.selected) {
                        item.selected = false;
                        item.doctor = "";
                    } else {
                        item.selected = true;
                        item.doctor = doctor;
                    }
                }
                return item
            })
        })
    }


    function handleCalenderOnChange(selectedDate) {
        setselected(true)
        new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)
        console.log(new Date(selectedDate).toLocaleDateString());
        setDate(new Date(selectedDate))
        setLoading(true)
        setTimes(prev => {
            let currentProvidedSlots = providedDate.find(item => new Date(item.date).toLocaleDateString() == new Date(selectedDate).toLocaleDateString());
            if (currentProvidedSlots?.times) {
                formData.date = new Date(currentProvidedSlots?.date)
                console.log(formData.date);
                let jsonCurrentProvidedSlots = JSON.stringify(currentProvidedSlots?.times)
                jsonCurrentProvidedSlots = JSON.parse(jsonCurrentProvidedSlots)
                setDate(currentProvidedSlots.date)
                setLoading(false)
                return jsonCurrentProvidedSlots.filter(item => {
                    if (!item.selected) {
                        item.doctor = doctor
                    }
                    return item
                })
            } else {
                formData.date = new Date(selectedDate)
                formData.date.setUTCHours(0, 0, 0, 0);

                formData.date.setDate(formData.date.getDate() + 1)
                setLoading(false)
                return slotTimes.filter(item => {
                    item.doctor = doctor
                    return item
                })
            }
        })
    }
    function handleReset() {
        setLoading(true)
        setTimes(prev => {
            let currentProvidedSlots = providedDate.find(item => new Date(item.date).toLocaleDateString() == new Date(date).toLocaleDateString());
            if (currentProvidedSlots?.times) {
                formData.date = new Date(currentProvidedSlots?.date)
                let jsonCurrentProvidedSlots = JSON.stringify(currentProvidedSlots?.times)
                jsonCurrentProvidedSlots = JSON.parse(jsonCurrentProvidedSlots)
                setDate(currentProvidedSlots.date)
                setLoading(false)
                return jsonCurrentProvidedSlots.filter(item => {
                    if (!item.selected) {
                        item.doctor = doctor
                    }
                    return item
                })
            } else {
                formData.date = new Date(date)
                formData.date.setUTCHours(0, 0, 0, 0);

                formData.date.setDate(formData?.date.getDate() + 1)
                setLoading(false)
                return slotTimes.filter(item => {
                    item.doctor = doctor
                    item.selected = true
                    return item
                })
            }
        })
    }
    function handleSubmit() {
        formData.time = times.filter(time => {
            if (!time.selected) {
                time.doctor = ""
            }
            return time
        })

        let newdate = new Date(formData.date)

        formData.date = newdate

        console.log(newdate);
        postRequest('/doctor/add-slots', formData).then(() => {
            getRequest('/doctor/get-slots').then(response => {
                swal("Slots Added");
                setProvidedDate(response.slots);
            })
        })
    }

    function handleRemove() {
        setTimes(prev => {
            return prev.filter(item => {
                item.selected = false;
                return item
            })
        })
    }

    return (
        <div className='doctor-slots-page'>
            <div className='calender-container'>
                <Calendar value={date} onChange={(selectedDate) => handleCalenderOnChange(selectedDate)} className={`calender ${!selected && 'auto-selected'}`} minDate={new Date(new Date().setDate(new Date().getDate()-1))} maxDate={maxDay} />
                <div className="btns">
                    <button onClick={handleSubmit} type='button'>Submit Slots</button>
                    <button onClick={handleReset} type='button'>Reset All</button>
                    <button onClick={handleRemove} type='button'>Remove All</button>
                </div>
            </div>
            <div className="time-slot-container">
                <h1>Available Time Slots</h1>
                <div className="times">
                    {loading ? 'loading' :
                        times.map(time => <div key={time.time} onClick={() => handleClick(time.time)} className={`time ${time.selected ? time.doctor == doctor ? 'selected' : 'not-selected' : 'select'} ${time.booked ? 'booked' : ''} `}>{time.time}</div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default DoctorSlots
import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch';
import { slotTimes } from '../../../util/slotsTimes';

const getRequest = useFetch('GET');

import './style.scss'

function ClientSlotsBooking() {
    const [providedSlots, setProvidedSlots] = useState([])

    const [slots, setSlots] = useState([])
    const [doctors, setDoctors] = useState([])

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

    useEffect(() => {
        getRequest('/user/get-slots').then(response => {
            setProvidedSlots(response.slots)
            setSlots(() => {
                let todaysSlots = response.slots.find(slot => {
                    if (new Date(slot.date).toLocaleDateString() == date.toLocaleDateString()) {
                        return slot
                    }
                })
                console.log(todaysSlots.times);
                if (todaysSlots?.length <= 0) {
                    return slotTimes
                } else {
                    return todaysSlots.times
                }

            })
        }).catch(err => console.log(err))

        getRequest('/user/get-all-doctors').then(res => {
            setDoctors(() => {
                let re = res.doctors.map(doctor => {
                    return {
                        doctor: doctor.username,
                        department: doctor.department
                    }
                })
                return re
            })
        })
    }, [])

    return (
        <div className='client-slots-booking'>
            <h1>Book A Slot</h1>
            <div className="slots">
                <div className="dates">
                    
                </div>
                <div className="times">
                    {slots && slots.map(slot => {
                        return <div key={slot.time} className="slot">{slot.time}</div>
                    })}
                </div>
            </div>
            <div className="filter">
                <div className="departments"></div>
                <div className="doctors"></div>
            </div>
        </div>
    )
}

export default ClientSlotsBooking
import React from 'react'

import './style.scss';
import DoctorCard from '../DoctorCard';

const doctors = [
    {
        name: "Alvin",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3gL1PK_0_94VYO6Ej6PnP69VfZwirOyeoP9KvmXaKOe0Q61CANTTAvhwUkClHoWFLQHA&usqp=CAU",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam accusantium quasi esse."
    },
    {
        name: "Caty",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3gL1PK_0_94VYO6Ej6PnP69VfZwirOyeoP9KvmXaKOe0Q61CANTTAvhwUkClHoWFLQHA&usqp=CAU",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam accusantium quasi esse."
    },
    {
        name: "Sam",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3gL1PK_0_94VYO6Ej6PnP69VfZwirOyeoP9KvmXaKOe0Q61CANTTAvhwUkClHoWFLQHA&usqp=CAU",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam accusantium quasi esse."
    }
]
function DoctorsList() {
    return (
        <div className="doctors-list">
            {doctors.map(doctor => {
                return <DoctorCard image={doctor.image} name={doctor.name} description={doctor.description} />
            })}
        </div>
    )
}

export default DoctorsList;
import React from 'react'

import './style.scss';

function DoctorCard({ image, name, description }) {
    return (
        <div className='doctor-card'>
            <div class="container">
                <div class="wrapper">
                    <div class="banner-image">
                        <img src={image} alt="" />
                    </div>
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
                <div class="button-wrapper">
                    <button class="btn outline">View</button>
                    <button class="btn fill">Book</button>
                </div>
            </div>
        </div>
    )
}

export default DoctorCard;
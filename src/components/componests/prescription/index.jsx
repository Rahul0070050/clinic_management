import React from 'react'

import './style.scss'

function Prescription({ prescriptions }) {
    return (
        <div className='doctor-prescription-view'>
            <div className="header">
                <h2>medicine</h2>
                <h2>morning</h2>
                <h2>noon</h2>
                <h2>night</h2>
            </div>
            <div className="body">
                {prescriptions.map(item => {
                    return <div className='list'>
                        <h2>{item.medicine}</h2>
                        <h2>{item.morning}</h2>
                        <h2>{item.noon}</h2>
                        <h2>{item.night}</h2>
                    </div>
                })}
                <span>more</span>
            </div>
        </div>
    )
}

export default Prescription
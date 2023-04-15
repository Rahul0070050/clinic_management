import React, { useState } from 'react'

import './style.scss';

function ContactForm() {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" })

    function onchangeHandler(e) {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    function onSubmitHandler(e) {
        console.log(formData);
    }
    return (
        <form className='contact-form'>
            <div className="form-group">
                <div className="form-control">
                    <label htmlFor="first-name">firstname</label>
                    <input onChange={onchangeHandler} type="text" name="firstName" id="first-name" />
                </div>
                <div className="form-control">
                    <label htmlFor="last-name">lastname</label>
                    <input onChange={onchangeHandler} type="text" name="lastName" id="last-name" />
                </div>
            </div>
            <div className="form-group">
                <div className="form-control">
                    <label htmlFor="mobile">mobile</label>
                    <input onChange={onchangeHandler} type="text" name="phone" id="mobile" />
                </div>
                <div className="form-control">
                    <label htmlFor="email">email</label>
                    <input onChange={onchangeHandler} type="email" name="email" id="email" />
                </div>
            </div>
            <div className="form-control">
                <label htmlFor="message">message</label>
                <textarea onChange={onchangeHandler} rows={6} type="text" name="message" id="message" />
            </div>
            <input type="button" onClick={onSubmitHandler} value="send" />
        </form>
    )
}

export default ContactForm
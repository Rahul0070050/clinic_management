import React from 'react'
import ContactForm from '../../../components/userComponents/contactForm'

import './style.scss'
import Footer from '../../../components/userComponents/footer'

function ContactUs() {
    return (
        <>
            <div className="contact-section">
                <div className="header">
                    <h1>Send a message</h1>
                </div>
                <ContactForm />
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default ContactUs
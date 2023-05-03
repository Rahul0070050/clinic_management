import React, { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import useFetch from '../../../hooks/useFetch'
import { setDoctors } from '../../../store/slice/userSlice'

import ContactForm from '../../../components/userComponents/contactForm';
import Footer from '../../../components/userComponents/footer';

import aboutBackground from '../../../assets/svg/about-section-background.svg'
import backgroundSvg from '../../../assets/svg/shape.svg'
import person1 from '../../../assets/svg/person-1.svg'
import person2 from '../../../assets/svg/person-2.svg'

import './style.scss';

function UserHome() {
  const getRequest = useFetch('GET');
  const dispatch = useDispatch()
  const { doctors } = useSelector(state => state.root.user)
  useLayoutEffect(() => {
    getRequest('/user/get-all-doctors').then(res => {
      console.log(res);
      dispatch(setDoctors(res?.doctors))
    })
  }, [])

  return (
    <div className='user-home'>
      <div className="intro-section">
        <div className="text">
          <h1>We help people to get appointment in online</h1>
          <span>Lorem Media is a full-service social media agency. We offer businesses innovative solutions that deliver the right type of audience to you in the most effective strategies possible. We strive to develop a community around your business, polishing your branding, and improving your public relations.</span>
          <Link to="/appointment">Book an appointment</Link>
        </div>
        <div className="image">
          <img src={backgroundSvg} alt="" />
          <div className="person">
            <img src={person2} alt="" />
            <img src={person1} alt="" />
          </div>
        </div>
      </div>
      <div className="about-section">
        <div className="image">
          <img src={aboutBackground} alt="" />
        </div>
        <div className="text">
          <span>Biography</span>
          <h1>Who We Are</h1>
          <p>Lorem Media is a full-service social
            media agency. We offer businesses innovative
            solutions that deliver the right type of audience
            to you in the most effective strategies possible.
            We strive to develop a community around your
            business, polishing your branding, and improving
            your public relations.
            Social Media is now one of the most powerful
            marketing tools with the ability to
            communicate with a target audience in real time.
            <br />
            <br />
            It's 2019: time to sink or swim.
            <br />
            <br />
            We are your Social Media Marketing Agency.
          </p>
          <br />
          <br />
          <a href="#">see more</a>
        </div>
      </div>
      <div className="doctor-list-section">
        <div className="header">
          <h1>All Doctors</h1>
        </div>
        <div className="doctors-list">
          {doctors && doctors.map(doctor => (<div key={doctor._id} className="card">
            <div className="image">
              <img src="data:image/jpeg;base64,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" alt="" />
            </div>
            <div className="info">
              <strong>{doctor.username}</strong>
              <span>{doctor.department}</span>
              <a href='#'>view</a>
            </div>
          </div>))}
        </div>
      </div>
      <div className="contact-section">
        <div className="header">
          <h1>Send a message</h1>
        </div>
        <ContactForm />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default UserHome;
import React from 'react'

import pageMainImage from '../../../assets/svg/aboutpage-image-01.svg'
import firstBackground from '../../../assets/svg/aboutpage-image-background-01.svg'
import pageImage from '../../../assets/svg/aboutpage-image-background-02.svg'

import './style.scss'
import Footer from '../../../components/userComponents/footer'

function AboutUs() {
  return (
    <div className='client-about-us'>
      <div className="about-section-1">
        <div className="left">
          <h2>
            We help people to <br />
            get appointment <br />
            in online <br />
          </h2>
          <p>
            Lorem Media is a full-service social media agency. We offer businesses innovative solutions
            that deliver the right type of audience to you in the most effective strategies possible. We strive to
            develop a community around your business, polishing your branding, and improving your public relations.
          </p>
        </div>
        <div className="right">
          <img src={firstBackground} alt="" />
          <img src={pageMainImage} alt="" />
        </div>
      </div>
      <div className="about-section-2">
        <div className="left">
          <img src={pageImage} alt="" />
        </div>
        <div className="right">
          <span>Biography</span>
          <h1>Who We Are</h1>
          <p>
            Lorem Media is a full-service social media agency. We offer businesses innovative solutions that deliver the right type of audience to you in the most effective strategies possible. We strive to develop a community around your business, polishing your branding, and improving your public relations.
            Social Media is now one of the most powerful marketing tools with the ability to communicate with a target audience in real time.
          </p>
          <br />
          <p>It's 2019: time to sink or swim.</p>
          <br />
          <p>We are your Social Media Marketing Agency.</p>
          <p>
            Lorem Media is a full-service social media agency. We offer businesses innovative solutions that deliver the right type of audience to you in the most effective strategies possible. We strive to develop a community around your business, polishing your branding, and improving your public relations.
            Social Media is now one of the most powerful marketing tools with the ability to communicate with a target audience in real time.
          </p>
          <br />
          <p>It's 2019: time to sink or swim.</p>
          <br />
          <p>We are your Social Media Marketing Agency.</p>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default AboutUs
import React, { useEffect, useRef, useState } from 'react'

import './style.scss'

function OtpVerification({ close, setOtp, otp, verifyOtp }) {
  const [time, setTime] = useState(59)
  let interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setTime(prevCount => prevCount - 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(interval.current);
    }
  }, [time]);


  return (
    <>
      <div className='top-verification-modal'>
        <h1 onClick={() => close(false)}>X</h1>
        <form>
          <div className="header">
            <div className="timer">
              {time > 9 ? <h1>0:{time}</h1> : <h1>0:0{time}</h1>}
            </div>
            <h1>OTP</h1>
          </div>
          <div className="form-control">
            <label htmlFor="otp">Enter Otp</label>
            <input type="number" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} name="otp" id="otp" />
            <div className="btns">
              <input type="button" value="re-sent" />
              {time > 0 ? <input type="button" value="Submit" onClick={verifyOtp} /> : <input disabled type="button" value="Submit" />}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default OtpVerification
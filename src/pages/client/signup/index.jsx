import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactPhoneNumber from 'react-phone-number-input'
import { ToastContainer, toast } from 'react-toastify';


import sideImage from '../../../assets/svg/login-page-logo.svg'

import useFetch from '../../../hooks/useFetch';
import { checkMobileNumberHasAnyCharacter, checkPasswordHasSpecialCharacters, checkStringHasNumbers, checkStringHasSpecialCharactersOrNumbers } from '../../../util/utilFunnctions';
import OtpVerification from '../../../components/componests/otpVarification';
import { auth } from '../../../firebase/config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import 'react-toastify/dist/ReactToastify.css';
import './style.scss'

function Signup() {
    let recaptchaVerifier = useRef(null);
    let confirmationResult = useRef(null);

    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;

    const postRequest = useFetch("POST");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [phoneVerified, setPhoneVerified] = useState(false)
    const [otp, setOtp] = useState("")

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    const [userDataErr, setUserDataErr] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    function handleOnchange(e) {
        setUserData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (userData.firstName == "" ||
            userData.lastName == "" ||
            userData.email == "" ||
            userData.mobile == "" ||
            userData.dateOfBirth == "" ||
            userData.gender == "" ||
            userData.password == "" ||
            userData.confirmPassword == "") {
            for (const key in userData) {
                if (userData[key] == "") {
                    setUserDataErr(prev => {
                        let message = " please provide"
                        return {
                            ...prev,
                            [key]: message
                        }
                    })
                } else {
                    setUserDataErr(prev => {
                        return {
                            ...prev,
                            [key]: ""
                        }
                    })
                }
            }

            return;
        } else {

            if (userData.password.length < 8) {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        password: " should have at lest 8 characters"
                    }
                })
                return
            } else {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        password: ""
                    }
                })
            }

            if (!checkPasswordHasSpecialCharacters(userData.password)) {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        password: "please include special characters"
                    }
                })
                return;
            } else {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        password: ""
                    }
                })
            }

            if (checkStringHasSpecialCharactersOrNumbers(userData.firstName)) {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        firstName: " don't allow special characters or number"
                    }
                })
                return;
            } else {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        firstName: ""
                    }
                })
            }
            if (checkStringHasSpecialCharactersOrNumbers(userData.lastName)) {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        lastName: " don't allow special characters or number"
                    }
                })
                return;
            } else {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        lastName: ""
                    }
                })
            }

            if (userData.password != userData.confirmPassword) {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        confirmPassword: " is not matching"
                    }
                })
                return;
            } else {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        confirmPassword: ""
                    }
                })
            }

            for (const key in userData) {
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        [key]: ""
                    }
                })
            }
        }

        postRequest("/user/is-user-exist", userData).then(async res => {
            if (res.ok && !recaptchaVerifier.current) {
                try {
                    recaptchaVerifier.current = await new RecaptchaVerifier('recaptcha-container', {}, auth);
                } catch (error) {
                    console.log(error);
                }
            }

            if (!confirmationResult.current) {
                try {
                    confirmationResult.current = await signInWithPhoneNumber(auth, userData.mobile, recaptchaVerifier.current)
                    console.log(confirmationResult.current);
                    toast('otp sent')
                    setOpen(true)
                } catch (error) {
                    console.log(error);
                }
            }
        }).catch(err => {
            setUserDataErr(prev => {
                return {
                    ...prev,
                    ...err
                }
            })
        })
    }
    function verifyOtp() {
        try {
            confirmationResult.current.confirm(otp).then(async res => {
                toast('mobile is number verified')
                submitForm()
                setOpen(false)
                setPhoneVerified(true)
            }).catch((err) => {
                setOtp("")
                toast("otp is invalid")
            })
        } catch (error) {
            console.log(error);
        }
    }

    function submitForm() {
        try {
            postRequest("/user/signup", userData).then(res => {
                console.log(res);
                localStorage.setItem('user-token', JSON.stringify(res.token))
                navigate('/login')
            }).catch(err => {
                console.log(err);
                setUserDataErr(prev => {
                    return {
                        ...prev,
                        ...err
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="user-signup">
            <ToastContainer />
            {open && <div className="otp-container"></div>}
            {open && <OtpVerification verifyOtp={verifyOtp} otp={otp} setOtp={setOtp} close={setOpen} />}
            <div className="info">
                <div className="text">
                    <h1>Sign Up</h1>
                    <h5>Please Sign Up To Continue</h5>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br />
                        Lorem Ipsum has been the industry's standard dummy text ever since.
                    </p>
                </div>
                <div className="image">
                    <img src={sideImage} alt="" />
                </div>
            </div>
            <form>
                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="first-name">First Name {userDataErr.firstName && <span>* {userDataErr.firstName}</span>}</label>
                        <input type="text" onChange={handleOnchange} name="firstName" id="first-name" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="last-name">Last Name {userDataErr.lastName && <span>* {userDataErr.lastName}</span>}</label>
                        <input type="text" onChange={handleOnchange} name="lastName" id="last-name" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="email">Email {userDataErr.email && <span>* {userDataErr.email}</span>}</label>
                        <input type="text" onChange={handleOnchange} name="email" id="email" />
                    </div>
                    <div className="form-control mobile">
                        <label htmlFor="mobile">Mobile {userDataErr.mobile && <span>* {userDataErr.mobile}</span>}</label>
                        {/* <input type="text" onChange={handleOnchange} name="mobile" id="mobile" /> */}
                        <ReactPhoneNumber country="US"
                            value={userData.mobile}
                            onChange={(e) => {
                                setUserData(prev => {
                                    return {
                                        ...prev,
                                        mobile: e
                                    }
                                })
                            }} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="date-of-birth">Date Of Birth {userDataErr.dateOfBirth && <span>* {userDataErr.dateOfBirth}</span>}</label>
                        <input type="date" onChange={handleOnchange} name="dateOfBirth" max={maxDate} id="date-of-birth" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="gender">Gender {userDataErr.gender && <span>* {userDataErr.gender}</span>}</label>
                        <select name="gender" onChange={handleOnchange} defaultChecked={"Select"} id="gender">
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Male">Female</option>
                            <option value="Male">Other</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="password">Password {userDataErr.password && <span>* {userDataErr.password}</span>}</label>
                        <input type="password" onChange={handleOnchange} name="password" id="password" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirm-password">Confirm Password {userDataErr.confirmPassword && <span>* {userDataErr.confirmPassword}</span>}</label>
                        <input type="password" onChange={handleOnchange} name="confirmPassword" id="confirm-password" />
                    </div>
                </div>
                <div id="recaptcha-container"></div>
                {phoneVerified ? <input type="button" onClick={submitForm} value="Submit" id="" /> :
                    <input type="button" onClick={handleSubmit} value="Verify OTP" id="" />}
            </form>
        </div>
    )
}

export default Signup
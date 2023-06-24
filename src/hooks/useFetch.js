import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function useFetch(method) {

    // const navigate = useNavigate()
    // const [first, setfirst] = useState()
    function setToken() {
        if (window.location.pathname.startsWith('/doctor')) {
            return JSON.parse(localStorage.getItem('doctor-token')) || ""
        } else if (window.location.pathname.startsWith('/admin')) {
            return JSON.parse(localStorage.getItem('admin-token')) || ""
        } else {
            return JSON.parse(localStorage.getItem('user-token')) || ""
        }
    }


    const token = setToken()
    let BASEURL = ""
    BASEURL = "https://skincareclinic.website/api"
    // BASEURL = "http://44.203.69.42/api"
    // BASEURL = "http://localhost:5000/api";
    // BASEURL = "https://clinic-management-kk67.onrender.com/api";
    let METHOD = null;
    let URL = "";

    switch (method) {
        case "GET":
            METHOD = "GET"
            break;
        case "POST":
            METHOD = "POST"
            break;
        case "PUT":
            METHOD = "PUT"
            break;
        case "DELETE":
            METHOD = "DELETE"
            break;
        case "PATCH":
            METHOD = "PATCH"
            break;
        default:
            METHOD = null;
    }

    return function fetchData(url, data = {}) {
        if (!URL.endsWith(url))
            URL = BASEURL.concat(url);
        return new Promise((resolve, reject) => {
            if (METHOD == null) {
                reject({ type: "", message: "method is not applicable" });
            }

            try {
                axios({
                    method: METHOD,
                    url: URL,
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    resolve(res?.data);
                }).catch(err => {
                    console.log(err);
                    if (err?.response?.data?.block) {
                        window.location = '/blocked'
                        return
                    }
                    if (err?.response?.data?.logedIn === false) {
                        if (window.location.pathname.startsWith('/doctor')) {
                            window.location = '/doctor/login'
                            return
                        } else if (window.location.pathname.startsWith('/admin')) {
                            window.location = '/admin/login'
                            return
                        } else {
                            window.location = '/login'
                            return
                        }
                    }
                    reject(err?.response?.data);
                })
            } catch (error) {
                console.log(error?.message);
                reject(error?.message);
            }
        })
    }
}

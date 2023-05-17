import React, { useState } from 'react'
import axios from 'axios'

export default function useFetch(method) {

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

    let BASEURL = "http://localhost:5000/api";
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
        console.log(data);
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
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    resolve(res?.data);
                }).catch(err => {
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
                    console.log(err?.response?.data);
                    reject(err?.response?.data);
                })
            } catch (error) {
                console.log(error?.message);
                reject(error?.message);
            }
        })
    }
}

import React from 'react'
import axios from 'axios'

export default function useFetch(method) {

    let BASEURL = "http://localhost:5000/api";
    let METHOD = null;

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


    return function fetchData(url, data) {
        if(!BASEURL.endsWith(url))
            BASEURL = BASEURL.concat(url);
        
        return new Promise((resolve, reject) => {
            if (METHOD == null) {
                reject("method is not applicable");
            }
            console.log(data);

            try {
                axios({
                    method: METHOD,
                    url: BASEURL,
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token')) || ""}`
                    }
                }).then(res => {
                    resolve(res?.data);
                }).catch(err => {
                    console.log(err?.response?.data?.message);
                    reject(err?.response?.data?.message);
                })
            } catch (error) {
                console.log(error?.message);
                reject(error?.message);
            }
        })
    }
}

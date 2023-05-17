import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch';

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'

import './style.scss'

const getRequest = useFetch("GET");

function Payments() {
  const [payments, setPayments] = useState([])
  useEffect(() => {
    getRequest('/admin/get-all-payments').then(response => {
      setPayments(response.result);
      console.log(response.result);
    })
  }, [])


  return (
    <div className='admin-all-payments-list'>
      <div className="all-payments">
        <div className="payments">
          <h2>All Payments</h2>
          <div className="container">
            <div className="table">
              <div className="table-header">
                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">ID</a></div>
                <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
                <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">email</a></div>
                <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">mobile</a></div>
                <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">amount</a></div>
                {/* <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Action</a></div> */}
              </div>
              <div className="table-content">
                {payments && payments.map((user, i) => {
                  const { firstName, lastName, email, mobile, amount, } = user;
                  return <div className="table-row" key={i}>
                    <div className="table-data"># {i + 1}</div>
                    <div className="table-data">{firstName + " " + lastName}</div>
                    <div className="table-data">{email}</div>
                    <div className="table-data">{mobile}</div>
                    <div className="table-data">{amount}</div>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payments
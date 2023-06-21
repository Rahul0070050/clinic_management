import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch';

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'

import './style.scss'

const getRequest = useFetch("GET");

function Payments() {
  const { search } = useSelector((state) => state.root.admin)

  const [payments, setPayments] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    getRequest('/admin/get-all-payments').then(response => {
      setPayments(response.result);
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
              </div>
              <div className="table-content">
                <div className="table-contents">
                  {search ? payments && payments.map((user, i) => {
                    if (!user.firstName.startsWith(search, 0)) {
                      return null
                    } else {
                      if (i >= count && i <= count + 9) {
                        const { firstName, lastName, email, mobile, amount, } = user;
                        return <div className="table-row" key={i}>
                          <div className="table-data"># {i + 1}</div>
                          <div className="table-data">{firstName + " " + lastName}</div>
                          <div className="table-data">{email}</div>
                          <div className="table-data">{mobile}</div>
                          <div className="table-data">{amount}</div>
                        </div>
                      } else {
                        return null
                      }
                    }
                  }) : payments && payments.map((user, i) => {
                    if (i >= count && i <= count + 9) {
                      const { firstName, lastName, email, mobile, amount, } = user;
                      return <div className="table-row" key={i}>
                        <div className="table-data"># {i + 1}</div>
                        <div className="table-data">{firstName + " " + lastName}</div>
                        <div className="table-data">{email}</div>
                        <div className="table-data">{mobile}</div>
                        <div className="table-data">{amount}</div>
                      </div>
                    } else {
                      return null
                    }
                  })}
                </div>
                <div className="actions">
                  <button onClick={() => {
                    if (count <= 0) {
                      setCount(0)
                    } else {
                      setCount(count - 9)
                    }
                  }}>&lt;</button>
                  {payments.map((item, i) => {
                    if (i % 9 == 0) {
                      return <span className={i == count ? 'selected' : ''} onClick={() => setCount(i)}>{i / 9 + 1}</span>
                    }
                  }
                  )}
                  <button onClick={() => {
                    if (count + 9 >= payments.length) {
                      setCount(count)
                    } else {
                      setCount(count + 9)
                    }
                  }}>&gt;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payments
import React, { useLayoutEffect } from 'react'

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'
import './style.scss'
import useFetch from '../../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctors } from '../../../store/slice/userSlice';

function DoctorHome() {
  const getRequest = useFetch('GET');
  const dispatch = useDispatch()
  const { doctors } = useSelector(state => state.root.user)
  useLayoutEffect(() => {
    getRequest('/doctor/get-all-doctors').then(res => {
      dispatch(setDoctors(res?.doctors))
    })
  }, [])
  return (
    <div className='doctor-home-page'>
      <div className="patients">
        <h2>Today's Appointments</h2>
        <div class="container">
          <div class="table">
            <div class="table-header">
              <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">ID</a></div>
              <div class="header__item"><a id="name" class="filter__link" href="#">Name</a></div>
              <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Time</a></div>
              <div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">Date</a></div>
              <div class="header__item"><a id="losses" class="filter__link filter__link--number" href="#">Phone</a></div>
              <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Actions</a></div>
            </div>
            <div class="table-content">
              <div class="table-row">
                <div class="table-data">#2234</div>
                <div class="table-data">Tom</div>
                <div class="table-data">12:30</div>
                <div class="table-data">23/12/2023</div>
                <div class="table-data">1349852349</div>
                <div class="table-data">
                  <span>
                    <img src={editIcon} alt="" />
                    <img src={deleteIcon} alt="" />
                  </span>
                </div>
              </div>
              <div class="table-row">
                <div class="table-data">#2234</div>
                <div class="table-data">Tom</div>
                <div class="table-data">12:30</div>
                <div class="table-data">23/12/2023</div>
                <div class="table-data">1349852349</div>
                <div class="table-data">
                  <span>
                    <img src={editIcon} alt="" />
                    <img src={deleteIcon} alt="" />
                  </span>
                </div>
              </div>
              <div class="table-row">
                <div class="table-data">#2234</div>
                <div class="table-data">Tom</div>
                <div class="table-data">12:30</div>
                <div class="table-data">23/12/2023</div>
                <div class="table-data">1349852349</div>
                <div class="table-data">
                  <span>
                    <img src={editIcon} alt="" />
                    <img src={deleteIcon} alt="" />
                  </span>
                </div>
              </div>
              <div class="table-row">
                <div class="table-data">#2234</div>
                <div class="table-data">Tom</div>
                <div class="table-data">12:30</div>
                <div class="table-data">23/12/2023</div>
                <div class="table-data">1349852349</div>
                <div class="table-data">
                  <span>
                    <img src={editIcon} alt="" />
                    <img src={deleteIcon} alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="doctors-list">
        <div className='container'>
          <h2>Doctors List</h2>
          <div className="list">
            {doctors && doctors.map(item => (<div className="item">
              <div className="info">
                <h3>{item.username}</h3>
                <h5>{item.department}</h5>
              </div>
              <div className="action">
                <a href="">chat</a>
              </div>
            </div>))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorHome
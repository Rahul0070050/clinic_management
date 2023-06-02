import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch';

import deleteIcon from '../../../assets/svg/delete-icon.svg'
import editIcon from '../../../assets/svg/edit-icon.svg'

import './style.scss'
import swal from 'sweetalert';
import { useSelector } from 'react-redux';

const postRequest = useFetch("POST");
const getRequest = useFetch("GET");

function AdminDepartments() {
  const [department, setDepartment] = useState([])
  const [departmentName, setDepartmentName] = useState("")
  const [departmentNameErr, setDepartmentNameErr] = useState(false)
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState("")
  const [count, setCount] = useState(0)


  const { search } = useSelector((state) => state.root.admin)


  useEffect(() => {
    getRequest('/admin/get-all-department').then(res => {
      setDepartment(res.allDepartments)
    })

  }, [])

  function deleteHandler(id) {
    swal({
      title: "Are you sure?",
      text: "Are you sure!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        getRequest(`/admin/delate-department/${id}`).then(res => {
          if (res.ok) {
            setDepartment(prev => {
              return prev.filter(department => department._id != id)
            })
          }
        }).then(res => {
        })
      }
    });
  }

  function addDepartmentHandler() {
    const regex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    if (departmentName == "") {
      setDepartmentNameErr(true)
      return
    }
    if (regex.test(departmentName)) {
      setDepartmentNameErr(true)
      return
    }
    setDepartmentNameErr(false)

    postRequest('/admin/add-department', { departmentName }).then(res => {
      if (res.ok) {
        setDepartment(prev => {

          return [res.result, ...prev]
        })
      }
    })
  }

  function editDepartmentHandler() {
    const regex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    if (departmentName == "") {
      setDepartmentNameErr(true)
      return
    }
    if (regex.test(departmentName)) {
      setDepartmentNameErr(true)
      return
    }
    setDepartmentNameErr(false)

    const body = {
      departmentName,
      id
    }

    postRequest('/admin/edit-department', body).then(res => {
      if (res.ok) {
        setDepartment(prev => {
          return prev.filter(item => {
            if (item._id == id) {
              item.name = departmentName
            }
            return item
          })
        })
        setDepartmentName("")
        setEdit(false)
      }
    })
  }


  return (
    <div className='admin-department'>
      <div className="all-departments">
        <div className="departments ">
          <div className='heading'>
            <h2>All departments</h2>
            <div className="form-control">
              <input type="text" placeholder="department" value={departmentName} style={{ border: departmentNameErr ? '2px solid red' : '' }} onChange={(e) => setDepartmentName(e.target.value)} name="department" id="" />
              {edit ? <button type='button' onClick={editDepartmentHandler}>edit</button> : <button type='button' onClick={addDepartmentHandler}>add</button>}
            </div>
          </div>
          <div className="container">
            <div className="table">
              <div className="table-header">
                <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">ID</a></div>
                <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
                <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">Doctors</a></div>
                <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Patients</a></div>
                <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">actions</a></div>
              </div>
              <div className="table-content">
                <div className="table-contents">
                  {search ? department && department.map((user, i) => {
                    if (!user.name.startsWith(search, 0)) {
                      return
                    } else {
                      if (i >= count && i <= count + 9) {
                        const { name, doctorsCount, patientsCount, _id } = user;
                        return <div className="table-row" key={i}>
                        <div className="table-data"># {i + 1}</div>
                        <div className="table-data">{name}</div>
                        <div className="table-data">{doctorsCount}</div>
                        <div className="table-data">{patientsCount}</div>
                        <div className="table-data">
                          <img src={editIcon} onClick={() => {
                            setDepartmentName(name)
                            setId(_id)
                            setEdit(true)
                          }} alt="" />
                          <img src={deleteIcon} alt="" onClick={() => deleteHandler(_id)} />
                        </div>
                      </div>
                      } else {
                        return null
                      }
                    }
                  }) : department && department.map((user, i) => {
                    if (i >= count && i <= count + 9) {
                      const { name, doctorsCount, patientsCount, _id } = user;
                      return <div className="table-row" key={i}>
                      <div className="table-data"># {i + 1}</div>
                      <div className="table-data">{name}</div>
                      <div className="table-data">{doctorsCount}</div>
                      <div className="table-data">{patientsCount}</div>
                      <div className="table-data">
                        <img src={editIcon} onClick={() => {
                          setDepartmentName(name)
                          setId(_id)
                          setEdit(true)
                        }} alt="" />
                        <img src={deleteIcon} alt="" onClick={() => deleteHandler(_id)} />
                      </div>
                    </div>
                      } else {
                        return null
                      }
                  })}
                </div>
                {department.length > 11 ?
                  <div className="actions">
                    <button onClick={() => {
                      if (count <= 0) {
                        setCount(0)
                      } else {
                        setCount(count - 9)
                      }
                    }}>&lt;</button>
                    {department.map((item, i) => {
                      if (i % 9 == 0) {
                        return <span className={i == count ? 'selected' : ''} onClick={() => setCount(i)}>{i / 9 + 1}</span>
                      }
                    }
                    )}
                    <button onClick={() => {
                      if (count + 9 >= department.length) {
                        setCount(count)
                      } else {
                        setCount(count + 9)
                      }
                    }}>&gt;</button>
                  </div>
                  : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDepartments
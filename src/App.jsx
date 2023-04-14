import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import Login from './pages/client/login'
import DoctorLogin from './pages/doctor/login'
import UserHome from './pages/client/home'

// style
import './App.css'
import Signup from './pages/client/signup'
import UserNavBar from './components/userComponents/navbar'

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <>
      <UserNavBar />
      <Login />
    </>
  },
  {
    path: "/signup",
    element: <>
      <UserNavBar />
      <Signup />
    </>
  },
  {
    path: '/doctor/login',
    element: <DoctorLogin />
  },
  {
    path: '/',
    element: <>
      <UserNavBar />
      <UserHome />
    </>
  }
])
function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App

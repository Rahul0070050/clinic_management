import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import Login from './pages/client/login'
import DoctorLogin from './pages/doctor/login'
import UserHome from './pages/client/home'

// style
import './App.css'
import Signup from './pages/client/signup'
import UserNavBar from './components/userComponents/navbar'
import BookAppointments from './pages/client/bookAppointment'
import AdminLogin from './pages/admin/login'
import AdminHome from './pages/admin/home'
import AdminNavBar from './components/adminComponents/navbar'
import AdminDoctorsList from './pages/admin/doctors'
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
    path: "/appointment",
    element: <>
      <UserNavBar />
      <BookAppointments />
    </>
  },
  {
    path: '/doctor/login',
    element: <DoctorLogin />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/admin/dashboard',
    element: <>
      <AdminNavBar />
      <AdminHome />
    </>
  },
  {
    path: '/admin/doctors',
    element: <>
      <AdminNavBar />
      <AdminDoctorsList />
    </>
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

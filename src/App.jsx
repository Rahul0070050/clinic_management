import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import UserNavBar from './components/userComponents/navbar'
import AdminNavBar from './components/adminComponents/navbar'
import DoctorNavBar from './components/doctorComponents/navbar'

import AdminLogin from './pages/admin/login'
import AdminHome from './pages/admin/home'
import AddDoctor from './pages/admin/addDoctor'
import AdminAppointments from './pages/admin/appointments'
import AdminDoctorsList from './pages/admin/doctors'
import EditDoctor from './pages/admin/editDoctor'
import AllUser from './pages/admin/users'
import AdminDepartments from './pages/admin/departments'
import Payments from './pages/admin/payments'

import Login from './pages/client/login'
import UserHome from './pages/client/home'
import ClientSlotsBooking from './pages/client/Slots'
import Signup from './pages/client/signup'
import AboutUs from './pages/client/aboutUs'
import UserProfile from './pages/client/profile'
import ForgotPassword from './pages/client/forgotPassword'
import Bookings from './pages/client/bookings/undex'
import BookingsInfo from './pages/client/BookingsInfo'

import Appointments from './pages/doctor/appointments'
import DoctorLogin from './pages/doctor/login'
import DoctorHome from './pages/doctor/home'
import DoctorSlots from './pages/doctor/slots'
import ViewAppointmentDetails from './pages/doctor/viewAppointmentDetails'
import Patients from './pages/doctor/patients'
import PatientProfile from './pages/doctor/patientProfile'
import DoctorProfile from './pages/doctor/profile'

import Blocked from './pages/Blocked'

// style
import './App.css'
import ErrorBoundary from './ErrorHandler'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <>
      <UserNavBar />
      <UserHome />
    </>
  },
  {
    path: "/login",
    element: <>
      <UserNavBar />
      <Login />
    </>
  },
  {
    path: "/blocked",
    element: <>
      <Blocked />
    </>
  },
  {
    path: "/forgot-password",
    element: <>
      <UserNavBar />
      <ForgotPassword />
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
      <ClientSlotsBooking />
    </>
  },
  {
    path: "/profile",
    element: <>
      <UserNavBar />
      <UserProfile />
    </>
  },
  {
    path: "/about-us",
    element: <>
      <UserNavBar />
      <AboutUs />
    </>
  },
  {
    path: "/bookings",
    element: <>
      <UserNavBar />
      <Bookings />
    </>
  },
  {
    path: "/booking/view-info",
    element: <>
      <UserNavBar />
      <BookingsInfo />
    </>
  },
  {
    path: '/doctor/login',
    element: <DoctorLogin />
  },
  {
    path: '/doctor/profile',
    element: <>
      <DoctorNavBar />
      <DoctorProfile />
    </>
  },
  {
    path: '/doctor/patient-info',
    element: <>
      <DoctorNavBar />
      <DoctorProfile />
    </>
  },
  {
    path: '/doctor/home',
    element: <>
      <DoctorNavBar />
      <DoctorHome />
    </>
  },
  {
    path: '/doctor/slots',
    element: <>
      <DoctorNavBar />
      <DoctorSlots />
    </>
  },
  {
    path: '/doctor/appointments',
    element: <>
      <DoctorNavBar />
      <Appointments />
    </>
  },
  {
    path: '/doctor/patients',
    element: <>
      <DoctorNavBar />
      <Patients />
    </>
  },
  {
    path: '/doctor/appointments/view-details',
    element: <>
      <DoctorNavBar />
      <ViewAppointmentDetails />
    </>
  },
  {
    path: '/doctor/patients/view-info',
    element: <>
      <DoctorNavBar />
      <PatientProfile />
    </>
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
    path: '/admin/users',
    element: <>
      <AdminNavBar />
      <AllUser />
    </>
  },
  {
    path: '/admin/doctors/add',
    element: <>
      <AdminNavBar />
      <AddDoctor />
    </>
  },
  {
    path: '/admin/doctors/editDoctor',
    element: <>
      <AdminNavBar />
      <EditDoctor />
    </>
  },
  {
    path: '/admin/appointments',
    element: <>
      <AdminNavBar />
      <AdminAppointments />
    </>
  },
  {
    path: '/admin/payments',
    element: <>
      <AdminNavBar />
      <Payments />
    </>
  },
  {
    path: '/admin/departments',
    element: <>
      <AdminNavBar />
      <AdminDepartments />
    </>
  }
])

function App() {
  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={routes} />
      </ErrorBoundary>
    </>
  )
}

export default App

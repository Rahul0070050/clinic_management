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
import AddDoctor from './pages/admin/addDoctor'
import DoctorHome from './pages/doctor/home'
import DoctorNavBar from './components/doctorComponents/navbar'
import DoctorSlots from './pages/doctor/slots'
import ClientSlotsBooking from './pages/client/Slots'
import AllPatientsList from './pages/admin/Patients'
import AllUser from './pages/admin/users'
import Appointments from './pages/doctor/appointments'
import EditDoctor from './pages/admin/editDoctor'
import ViewAppointmentDetails from './pages/doctor/viewAppointmentDetails'
import Patients from './pages/doctor/patients'
import PatientProfile from './pages/doctor/patientProfile'
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
      <Login />
    </>
  },
  {
    path: "/signup",
    element: <>
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
    path: '/doctor/login',
    element: <DoctorLogin />
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
    path: '/admin/patients',
    element: <>
      <AdminNavBar />
      <AllPatientsList />
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

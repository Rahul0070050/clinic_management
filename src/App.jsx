import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import Login from './pages/client/login'

// style
import './App.css'
import Signup from './pages/client/signup'

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])
function App() {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App

import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import Login from './pages/client/login'

// style
import './App.css'

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  }
])
function App() {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App

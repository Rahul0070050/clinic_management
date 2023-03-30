import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useDispatch, useSelector } from 'react-redux'

// utils
import { userSelector } from './store/slice/userSlice'
import { userLogin } from './store/actions/userActions';

// pages
import Login from './pages/client/login'

// style
import './App.css'

function App() {

  const dispatch = useDispatch();
  const { userName } = useSelector(userSelector);

  return (
    <Login />
  )
}

export default App

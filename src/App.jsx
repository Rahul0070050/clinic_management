import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from './store/slice/userSlice'
import { userLogin } from './store/actions/userActions';

function App() {

  const dispatch = useDispatch();
  const { userName } = useSelector(userSelector);

  return (
    <>
      <button onClick={() => dispatch(userLogin())}>click me</button>
      <h1>{userName}</h1>
    </>
  )
}

export default App

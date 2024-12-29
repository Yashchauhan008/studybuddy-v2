import React from 'react'
import { useNavigate } from 'react-router-dom'


const Display = () => {
    const navigate = useNavigate()
  return (
    <>
    <h1>display</h1>
    <button onClick={()=>{navigate("/auth/subjects")}}>subjects</button>
    </>
  )
}

export default Display
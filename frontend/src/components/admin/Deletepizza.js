import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Deletepizza = () => {
    const navigate = useNavigate();

    useEffect(()=>{
     navigate("/admin");
    })
  return (
    <div>Deletepizza</div>
  )
}

export default Deletepizza
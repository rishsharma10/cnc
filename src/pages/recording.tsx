import { GlobalContext } from '@/context/Provider'
import React, { useContext } from 'react'

const recording = () => {
    const {Video} = useContext(GlobalContext)
    console.log(Video,"videeoeoo");
    
  return (
    <div>
    </div>
  )
}

export default recording

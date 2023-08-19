import React from 'react'
import { useParams } from 'react-router-dom'

const FullPic = () => {

    const {params} = useParams();
    console.log("hook " , params)

  return (
    <div>user , {params}</div>
  )
}

export default FullPic
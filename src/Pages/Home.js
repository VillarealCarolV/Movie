import React from 'react'
import Leftbar from '../component/Leftbar/Leftbar'


import MainContainer from '../component/MainContainer/MainContainer'
import Rightbar from '../component/Rightbar'
import "./Home.css"


export default function Home() {
  return (
    <div className='mainContainerForHome'>
      <Leftbar />
      <MainContainer/>
      <Rightbar/>
    </div>
  )
}


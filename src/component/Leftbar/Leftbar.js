import React from 'react'
import "./Leftbar.css"
import Profile from "../../Images/Profile.jpg"
import Logo from "../../Images/movielogo.png"


export default function Leftbar() {
  return (
    <div className='LeftbarMainContainer'>
      <h2 className='logo' style={{marginBottom:"-80px"}}><img src={`${Logo}`}>
      </img></h2>
     <div>
        <p className='menu'>Menu</p>
        <ul>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Browse</p>

            </li>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Watching Lists</p>

            </li>
            <li> 
              <img src='' alt=''></img>
              <p className='listname'>Coming Soon!</p>

            </li>
            
        </ul>
     </div>

     <div>
        <p className='menu'>Social</p>
        <ul>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Friends</p>

            </li>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Parties</p>

            </li>    
        </ul>
     </div>

     <div>
        <p className='menu'>General</p>
        <ul>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Setting</p>

            </li>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Logout</p>

            </li>
           
            
        </ul>
     </div>
     <div className='ProfileLine'>
      <img src={`${Profile}`} className='ProfileImage'></img>
      <p className='UserName'>Your Name</p>
      <p className='viewingtime'>5/6hr viewing time</p>
      <button className='btnProfile'>Profile</button>
     </div>
    </div>
  )
}

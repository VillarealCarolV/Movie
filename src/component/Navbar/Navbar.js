import React from 'react'
import "./Navbar.css"
import Notification from "../../Images/bell(1).png"
import UserProf from "../../Images/Profile.jpg"
import Search from "../../Images/search (1).png"

export default function Navbar() {
    return (
        <div className='MainNavbar'>

            <div className='NavitemContainer'>
                <div className='searchItems' >
                    <img src={`${Search}`} className='searchIcon'></img>
                    <input type='search' className='searchbar' placeholder='Search'></input>
                </div>
                <div className='ProfileContainer'>
                    <img src={`${Notification}`} className='notif-icon'></img>
                    <img src={`${UserProf}`} className='profile-icon'></img>
                    <p className='profilename'>Profile Name</p>
                </div>

            </div>


        </div>
    )
}

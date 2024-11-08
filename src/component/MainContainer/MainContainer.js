import React from 'react'
import "./MainContainer.css"
import Navbar from '../Navbar/Navbar'
import coverimage from "../../Images/Sweet-Home-Season-2-Release-Date.webp"
import itemimage from "../../Images/bad-prosecutor-official-poster-01-e1663259846793.jpeg"
import itemimage1 from "../../Images/Battle Ship.jpg"
import itemimage2 from "../../Images/John WIck.jpg"
import itemimage3 from "../../Images/Stranger Things.jpg"
import itemimage4 from "../../Images/Vigilante.webp"



export default function MainContainer() {
  return (
    <div className='mainContainer'>
      <Navbar />
      <div>
        <img src={`${coverimage}`} alt='' className='coverimage' />
        <div className='ItemsCOntainer'>
          <p className='nametitle'>Sweet Home Season 2</p>
          <p className='subtitle'>98% match</p>
          <div className='btnContainer' >
            <button className='btnwatch'> Watch Now</button>
            <div className='watchlater'>
              <p className='plus'>+</p>
            </div>
          </div>

        </div>
      </div>

      <div>
        <h4 className='submaintitle'>Continue  Playing</h4>
        <div style={{ display: "flex", marginLeft: "60px", flexWrap: "wrap" }}>
          <div className='ItemContainer'>
            <img src={`${itemimage}`} alt='' className={"itemimage"} />
            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>

            </div>
          </div>


          <div className='ItemContainer'>
            <img src={`${itemimage1}`} alt='' className={"itemimage"} />
            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>
            </div>


          </div>


          <div className='ItemContainer'>
            <img src={`${itemimage2}`} alt='' className={"itemimage"} />
            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>
            </div>


          </div>

          <div className='ItemContainer'>
            <img src={`${itemimage3}`} alt='' className={"itemimage"} />
            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>
            </div>


          </div>

          <div className='ItemContainer'>
            <img src={`${itemimage4}`} alt='' className={"itemimage"} />
            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>
            </div>


          </div>
        </div>

      </div>

      <div>
        <h4 className='submaintitle'>Recommend Movies</h4>
        <div style={{ display: "flex", marginLeft: "60px", flexWrap: "wrap" }}>
          <div className='ItemContainer'>
            <img src={`${itemimage}`} alt='' className={"itemimage"} />

            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>
            </div>


          </div>

          <div className='ItemContainer'>
            <img src={`${itemimage1}`} alt='' className={"itemimage"} />

            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>
            </div>
          </div>

          <div className='ItemContainer'>
            <img src={`${itemimage2}`} alt='' className={"itemimage"} />

            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>
            </div>
          </div>

          <div className='ItemContainer'>
            <img src={`${itemimage3}`} alt='' className={"itemimage"} />

            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>
            </div>
          </div>

          <div className='ItemContainer'>
            <img src={`${itemimage4}`} alt='' className={"itemimage"} />
            <div className='btnplay'>
              <button className='btnItemContainer'><i class="fa-solid fa-play" style={{color: "#ffffff"}}></i> Play Now</button>
            </div>


          </div>
        </div>

      </div>
    </div>
  )
}

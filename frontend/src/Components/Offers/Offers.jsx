import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png';

function Offers() {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <p>Offers For You</p>
            <p>Only On Best Seller Product</p>
            <button>check now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}


export default Offers

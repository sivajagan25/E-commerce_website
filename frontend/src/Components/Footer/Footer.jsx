import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import insta from '../Assets/instagram_icon.png'
import pintester from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'
const Footer =() =>{
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer_logo} alt="" />
            <p>Shopper</p>
        </div>
        <ul className='footer-links'>
            <li>company</li>
            <li>Product</li>
            <li>offices</li>
            <li>about</li>
            <li>contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={insta} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={pintester} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={whatsapp} alt="" />
            </div>
           
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 -All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
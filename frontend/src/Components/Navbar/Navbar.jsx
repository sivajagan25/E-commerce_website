import React,{useState,useContext } from 'react' 
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import './Navbar.css'
import { Link} from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { useRef } from 'react';
import drop_down from '../Assets/dropdown_icon.png'

const Navbar = () =>{
    const[Menu,SetMenu] = useState("shop")
    const {getTotalCartItem}=useContext(ShopContext);
    const menuRef =useRef();
    const dropdown_toggle=(e)=>{
            menuRef.current.classList.toggle('nav-menu-visible');
            e.target.classList.toggle('open');
    }
    
  return (
    <>
     <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
       <p> shopper</p>
       </div>     
       <img className='drop_down'onClick={dropdown_toggle} src={drop_down} alt="" />
      <ul ref={menuRef} className='nav-menu'>
      <li onClick={()=>{SetMenu("shop")}}> <Link style={{textDecoration:'none'}} to='/' >shop</Link>{Menu==="shop"?<hr/>:<></>}</li>
      <li onClick={()=>{SetMenu("mens")}}>  <Link style={{textDecoration:'none'}} to='/mens' >men</Link>{Menu==="mens"?<hr/>:<></>}</li>
      <li onClick={()=>{SetMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>women</Link>{Menu==="womens"?<hr/>:<></>}</li>
      <li onClick={()=>{SetMenu("kids")}}> <Link style={{textDecoration:'none'}} to='/kids' >kids</Link>{Menu==="kids"?<hr/>:<></>}</li>
      
        </ul>  
        <div className="nav-login-cart">
          {localStorage.getItem('auth=token')?<button onClick={()=>{localStorage.removeItem('auth=token');window.location.replace("/")}}>Logout 
          </button>: <Link to='/login'><button>Login</button></Link>}
       
        <Link to='/cart'><img src={cart_icon} alt="carticon" /></Link>
        <div className="nav-cart-count" >{getTotalCartItem()}</div>
       </div>
     
       
     </div></>
   
  )
}


export default Navbar
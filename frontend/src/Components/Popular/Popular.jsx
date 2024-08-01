import React from 'react'
import './Popular.css';
import Item from '../Item/Item.jsx'
//import data_product from '../Assets/data';
import { useState } from 'react';
import { useEffect } from 'react';

const Popular =() => {
  const [popularProducts,setPopularPoducts]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen')
    .then((response)=>response.json())
    .then((data)=>setPopularPoducts(data));
  },[])
   return (
    <div className='popular'>
        
        <h1>Popular In Women</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item,i)=> {
                return<Item Key={i} id={item.id} name={item.name} image={item.image}
                 new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  
  
  )
}

export default Popular
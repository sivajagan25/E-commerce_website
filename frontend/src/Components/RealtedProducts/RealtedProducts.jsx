import React from 'react'
import './RealtedProducts.css'
import Item from '../Item/Item.jsx';
import data_product from '../Assets/data.js';

const  RealtedProducts= () => {
  return (
    <div className='realtedproducts'>
        <h1>Realted Products</h1>
        <hr />
        <div className="realtedproducts-item">
        {data_product.map((item,i)=> {
                return<Item Key={i} id={item.id} name={item.name} image={item.image}
                 new_price={item.new_price} old_price={item.old_price} />})}

        </div>
    </div>
  )
}

export default RealtedProducts
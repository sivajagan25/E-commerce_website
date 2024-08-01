import React ,{createContext, useState}from 'react'
import { useEffect } from 'react';
//import all_product from '../Components/Assets/all_product'
export const ShopContext=createContext(null);
 const getDefaultCart =()=>{
   let cart ={};
    for (let index = 0; index < 300+1; index++) {
         cart[index]=0;
      
    }
    return cart;
 }
const ShopContextProvider =(props) =>
{
   const [all_product,setAll_Products]=useState([]);
   const[cartItems,setCartItems]=useState(getDefaultCart());
  
    useEffect(()=>{
      fetch('http://localhost:4000/allproducts')
      .then((response)=>response.json())
      .then((data)=>setAll_Products(data))
     },[])
     
      const addToCart= (itemId)=>{
         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
         if(localStorage.getItem('auth=token')){
               fetch('http://localhost:4000/addtocart',{
                  method:'POST',headers:{
                     Accept:'application/form-data',
                     'auth-token':`${localStorage.getItem('auth=token')}`,
                     'Content-Type':'application/json',
                     
                  },body:JSON.stringify({"itemId":itemId}),
               })
               .then((response)=>response.json())
               .then((data)=>console.log(data));
         }
      }
      
      
      const removeFromCart=(itemId)=>{
         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

      }

      
      const getTotalAmount=()=>
      {
         let totalamount=0;                                                                                                                                                                                                         
         for(const item in cartItems){                
            if(cartItems[item]>0){
               let itemInfo =all_product.find((product)=>product.id===Number(item)) 
               totalamount+=  itemInfo.new_price * cartItems[item];
            } 
            
            
         }
         return totalamount; 
        
      }
   

      const getTotalCartItem=()=>{
         let totalItem=0;
         for(const item in cartItems){
            if(cartItems[item]>0){
               totalItem+=cartItems[item];
            }
           
         }
         return totalItem;
      }
      
      const contexValue ={all_product,cartItems,addToCart,removeFromCart,getTotalCartItem,getTotalAmount};
     
  return (
     < ShopContext.Provider value={contexValue}>
        {props.children}
     </ShopContext.Provider>
    
  )
}

export default ShopContextProvider;
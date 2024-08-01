import React,{ useState } from 'react'
import './LoginSingnUp.css'

 
 const  LoginSignUp=()=> {

  const [state,setState]= useState("Login");
  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })
  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

  }
  const login=async ()=>{
    console.log("login fn executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth=token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup=async ()=>{
    console.log("signup fn executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth=token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
         {state==='Sign Up'? <input type="text"     onChange={changeHandler} value={formData.username} name='username' placeholder='Your name'/>:<></>}
          <input type="email"     name='email'      onChange={changeHandler} value={formData.email} placeholder='Email Address'/>
          <input type="password"  name='password'   onChange={changeHandler} value={formData.password} placeholder='password'/>
        </div>
        <button onClick={()=>state==="Login"?login():signup() }>Continue</button>
        {state==='Sign Up'?<p className='loginsignup-login'>Already have an account?<span onClick={()=>setState("Login")}> Login here</span></p> :
          <p className='loginsignup-login'>create an account?<span onClick={()=>setState("Sign Up")}>click here</span ></p> }
        
        <div className='loginsignup-agree'>
          <input type="checkbox" name='' id='' />
          <p>BY continue,i agree to terms and policies</p>
        </div>

      </div >
    </div>
  )
}

export default LoginSignUp;
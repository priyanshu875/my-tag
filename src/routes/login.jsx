import React, { useState } from "react";
import './css/login.css'
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Login(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    async function loginUser(event){
        event.preventDefault();
       
        try{const obj=await fetch('http://localhost:3001/auth/signin',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const data=await obj.json();
        if(data.user){
            localStorage.setItem("token",data.user)
            alert('login succesfull')
            window.location.href='/dashboard';
        }
        else{
            alert('check your credentials')
        }}
        catch(err){
            alert("server error");
        }

    }


    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token){
            window.location.href='./dashboard'
        }
    },[])

    return <div className="Login">
        <div className="center-div">
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="text"
                placeholder=" Email"
                required
                />

                <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                placeholder=" Password"
                required
                />
                <p>If new, <Link to="../register">create account here</Link> Or <Link to="../">home</Link></p>
                <input 
                type="submit"
                value='Login'
                />
            </form>
        </div>    
    </div>
}

export default Login;
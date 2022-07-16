import React, { useState } from "react";
import './css/register.css'
import { Link } from "react-router-dom";


function Register(){
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    
    async function registerUser(event){
        event.preventDefault();
        try{const obj= await fetch('https://localhost:3001/auth/signup',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name,email,password})
            })
            const data= await obj.json();

            console.log(data);
            if(data.status=='ok'){
                alert('account created');
                window.location.href='/login';
            }
            else if(data.status=='err'){
                alert('Email already exists');
            }
        }
        catch(err){
            alert("server error");
            window.location.reload();
        }
    }

    return <div className="Register">
        <div className="center-div">
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                type="text"
                placeholder=" Name"
                required
                />

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
                <p>Or <Link to="../login">Login here</Link> Or <Link to="../">home</Link></p>

                <input 
                type="submit"
                value='Register'

                />
            </form>
        </div>
    </div>
}

export default Register;
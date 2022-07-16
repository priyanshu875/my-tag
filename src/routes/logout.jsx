import React from "react";
import { useEffect } from "react";

function Logout(){

    

    useEffect(()=>{
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
            console.log('logged-out');
        }
        else{
            console.log('you were not logged-in');
        }
        setTimeout(function(){
            window.location.href='/login';
        },2000);
    })

    return <div className="logout">
        <h1 >Logging out...</h1>
    </div>
}
export default Logout
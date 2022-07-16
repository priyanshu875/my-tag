import React, { useState } from "react";
import { storage } from "./firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import './css/sendmsg.css'
import uuid from 'react-uuid';

function SendMsg(){


    // const[image,setImage]=useState(null);
    const[imageUrl,setImageUrl]=useState('');
    const[itemId,setItemId]=useState('')
    const[senderName,setSenderName]=useState('')
    const[senderContact,setSenderContact]=useState('')
    const[senderAddress,setSenderAddress]=useState('')
    const[senderMessage,setSenderMsg]=useState('')
    const[dis,setDis]=useState(true);

    function uploadImg(file){
        document.getElementById("btn-sub").disabled = true;
        document.getElementById("btn-sub").value='uploading'

        console.log(file);
        const imageRef=ref(storage,`image/${file.name+uuid()}`);
        uploadBytes(imageRef,file).then((snapshot)=>{
            console.log('uploaded');
            getDownloadURL(imageRef).then((url)=>{
                console.log(url);
                setImageUrl(url)
                setDis(true);
                document.getElementById("btn-sub").value='Send';
                document.getElementById("btn-sub").disabled = false;
                
            })
        })
        
    }

    

    async function sendMsg(event){
        try{event.preventDefault();
        let data=await fetch('https://my-tag.herokuapp.com/msg/sendmsg',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({itemId,senderName,senderContact,senderAddress,senderMessage,imageUrl})
        })
        let obj=await data.json();
        if(obj.status=='ok')alert('Thanks for your support')
        else alert('Server error');
        console.log(obj);
        // if(obj.status=='ok')alert('Thank you for your support')
        // else alert('Server problem')
        }catch(err){
            alert(err)
        }
    }



    return <div className="sendmsg">
        <header>
        <span onClick={(e)=>{
            window.location.href='../'
        }} class="material-symbols-outlined">anchor</span>
        
        </header>
        <div className="center-send">
        <form onSubmit={sendMsg}>   
        <h1>Found an item?</h1>
        
            <input 
            type="text" 
            value={itemId}
            onChange={(e)=>setItemId(e.target.value)}
            placeholder="# Item ID"
            />
            <input 
            type="text" 
            value={senderName}
            onChange={(e)=>setSenderName(e.target.value)}
            placeholder="Name"
            />
            <input 
            type="text" 
            value={senderContact}
            onChange={(e)=>setSenderContact(e.target.value)}
            placeholder="Email / Mobile"
            />
            <input 
            type="text" 
            value={senderAddress}
            onChange={(e)=>setSenderAddress(e.target.value)}
            placeholder="Address"
            />
            <input 
            type="text" 
            value={senderMessage}
            onChange={(e)=>setSenderMsg(e.target.value)}
            placeholder="Item Description:"
            />
            <span>Upload any proof : <input 
            type='file'
            onChange={(e)=>uploadImg(e.target.files[0])}
            required
            /></span>
            <p id="uploading"></p>

            <input type="submit" value="Send" id="btn-sub" disabled/>
        </form></div>
    </div>
}

export default SendMsg;
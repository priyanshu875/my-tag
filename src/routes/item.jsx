import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas';
import { useCallback } from "react";
import downloadjs from 'downloadjs';
import { async } from "@firebase/util";
import { Link } from "react-router-dom";
import './css/item.css'




function Item(){
    // document.getElementById('btn-click').onclick=function(){
        
    // }

    
    const itemId=useParams().itemId;
    const[msg,setMsg]=useState([]);
    const[itemInfo,setItemInfo]=useState([]);
    console.log(msg);
    console.log(itemInfo);

    //get item info
    async function getItemMsg(){
        const url='https://my-tag.onrender.com/msg/getmsg/'+itemId;

        const data=await fetch(url,{
            headers:{
                'x-access-token':itemId
            }
        })
        const obj=await data.json();
        obj.msg.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        // console.log(obj.msg);
        setMsg(obj.msg)
        
        
        
    }

    async function getItemInfo(){
        const url='https://my-tag.onrender.com/operation/getiteminfo/'+itemId;
        const data=await fetch(url,{
            headers:{
                'x-access-token':itemId
            }
        })
        const obj=await data.json();
        // console.log(obj);
        setItemInfo(obj.info);
    }
    async function deleteItem(itemId){
        let url='https://my-tag.onrender.com/operation/deleteItem/'+itemId;
        let data=await fetch(url,{
            method:'DELETE'
        });
        let obj=await data.json();
        if(obj.status=='deleted'){
            alert('Item deleted');
            window.location.href='./'
        }
        else alert('server error')
    }

    //deleting msg
    async function deleteMsg(msgId){
        let url='https://my-tag.onrender.com/msg/deleteMsg/'+msgId;
        let data=await fetch(url,{
            method:'DELETE'
        });
        let obj=await data.json();
        if(obj.status=='deleted'){
            alert('Moved To Trash');
            
        }
        else alert('server error')
        window.location.reload();
    }
    
    

    function openImg(url){
        window.open(url)
    }

    useEffect(()=>{
        getItemInfo();
        getItemMsg();
        

        console.log(msg);
    },[])

    const downQr=useCallback(async ()=>{
        document.getElementById('btn-click').innerHTML='Please wait';
        const canvas=await html2canvas(document.getElementById('qr-div'))
        const dataUrl=canvas.toDataURL('image.png')
        downloadjs(dataUrl,'my-qr.png','image/png');
        document.getElementById('btn-click').innerHTML='Download QR code';
    },[])
    // function downQr(){
    //     document.getElementById('btn-click').innerHTML='Please wait';
    //     const qrCode=document.getElementById('qr-div');
    //     html2canvas(qrCode).then((canvas)=>{
    //         const base64image=canvas.toDataURL('image/png');
    //         var anchor=document.createElement('a');
    //         anchor.setAttribute('href',base64image);
    //         anchor.setAttribute('download','myqr-img.png');
    //         anchor.click();
    //         anchor.remove();
    //     })
    //     // document.getElementById('btn-click').innerHTML='donw';
    //     document.getElementById('btn-click').innerHTML='Download QR code';
    // }
    

    return <div className="item-comp">
        <div><h1 className="name"><span>{itemInfo.itemName} </span><Link to="../logout" className="logoutlink">Logout</Link></h1></div> 

        <div className="item-body">
            <div className="item-info" id="item-info">
                <div className="qr-div" id="qr-div"><p className="qr-id">ID #{itemId}</p>
                <QRCode value={itemId} id="qrCode" className="qrCode"/>
                <p className="qr-web-link">visit www.mytag.com</p></div>
                <button id="btn-click" onClick={downQr} >Download QR code</button>

                <div className="info-box"><p> <b>Item name :</b> {itemInfo.itemName}</p>
                <p> <b>Item description :</b> {itemInfo.itemDescription}</p>
                <button onClick={(e)=>deleteItem(itemId)}>Delete Item</button>
                </div>
                <br />
            </div>
            <div className="item-msg">
                <h1>Notifications</h1>
                {msg.length ? msg.map((value,key)=>{
                    
                    return(<div className="msg-box">
                        {value.senderName ? <span><h4>Name</h4> <p>{value.senderName}</p></span> : <span> </span>}
                        {value.senderContact ? <span><h4>Contact</h4> <p>{value.senderContact}</p></span> : <span> </span>}
                        {value.senderAddress ? <span><h4>Address </h4><p>{value.senderAddress}</p></span> :<span> </span>}
                        {value.senderMessage ? <span><h4>Item Description </h4><p>{value.senderMessage}</p></span> : <span> </span>}
                        {value.imageUrl ? <div><span><h4>Proof</h4></span><img src={value.imageUrl } alt="" height='100px' width="50%" onClick={(e)=>openImg(value.imageUrl)} /></div> : <span> </span>}
                        <button onClick={(e)=>deleteMsg(value._id)}> move to trash</button>
                        <hr />
                        <br />
                    </div>)
                }):<p>No message</p>}
            </div>

        </div>

    </div>
}
export default Item;
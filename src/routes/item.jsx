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
        const url='https://my-tag.herokuapp.com/msg/getmsg/'+itemId;

        const data=await fetch(url,{
            headers:{
                'x-access-token':itemId
            }
        })
        const obj=await data.json();
        // console.log(obj.msg);
        setMsg(obj.msg)
        
    }

    async function getItemInfo(){
        const url='https://my-tag.herokuapp.com/operation/getiteminfo/'+itemId;
        const data=await fetch(url,{
            headers:{
                'x-access-token':itemId
            }
        })
        const obj=await data.json();
        // console.log(obj);
        setItemInfo(obj.info);
    }
    function openImg(url){
        window.open(url)
    }

    useEffect(()=>{
        getItemInfo();
        getItemMsg();
        
    },[])

    // const downQr=useCallback(async ()=>{
    //     const canvas=await html2canvas(document.getElementById('item-info'))
    //     const dataUrl=canvas.toDataURL('image.png')
    //     downloadjs(dataUrl,'my-qr.png','image/png');
    // },[])
    function downQr(){
        const qrCode=document.getElementById('qr-div');
        html2canvas(qrCode).then((canvas)=>{
            const base64image=canvas.toDataURL('image/png');
            var anchor=document.createElement('a');
            anchor.setAttribute('href',base64image);
            anchor.setAttribute('download','myqr-img.png');
            anchor.click();
            anchor.remove();
        })
    }

    return <div className="item-comp">
        <div><h1 className="name"><span>{itemInfo.itemName} </span><Link to="../logout" className="logoutlink">Logout</Link></h1></div> 

        <div className="item-body">
            <div className="item-info" id="item-info">
                <div className="qr-div" id="qr-div"><p className="qr-id">ID #{itemId}</p>
                <QRCode value={itemId} id="qrCode" className="qrCode"/>
                <p className="qr-web-link">visit www.mytag.com</p></div>
                <button id="btn-click" onClick={downQr} >Download QR code</button>
                <div className="info-box"><p> <b>Item name :</b> {itemInfo.itemName}</p>
                <p> <b>Item description :</b> {itemInfo.itemDescription}</p></div>
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
                        {value.imageUrl ? <div><span><h4>Proof</h4></span><img src={value.imageUrl} alt="" height='100px' width="50%" onClick={(e)=>openImg(value.imageUrl)} /></div> : <span> </span>}
                        <hr />
                        <br />
                    </div>)
                }):<p>No message</p>}
            </div>

        </div>

    </div>
}
export default Item;
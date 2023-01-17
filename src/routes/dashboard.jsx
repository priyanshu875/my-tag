import React from "react";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { Link } from "react-router-dom";

import './css/dashboard.css'



function Dashboard(){
    const [allItems,setAllItems]=useState([]);

     //get all items
    async function getAllItems(){
        const token=localStorage.getItem('token');
        const user=jwt_decode(token);
        const userId=user.userId;
        const obj=await fetch('https://my-tag.onrender.com/operation/getallitems',{
            headers:{
                'x-access-token':userId
            }
        })
        const data=await obj.json();
        if(data.items){
            // console.log(data);
            setAllItems(data.items);   
            console.log(data.items);
        }
        

    }

   
    //use effect for getting all items
    useEffect(()=>{
            localStorage.removeItem('itemId')

            const token=localStorage.getItem('token');
            if(token){
                const user=jwt_decode(token);
                if(user){
                    getAllItems();
                }
                else{
                    localStorage.removeItem('token');
                }
                
            }
            else{
                localStorage.removeItem('token');
                window.location.href='/login'
                console.log('not');
            }
            
    },[])



    //setting item name and item description for adding item
    const[itemName,setitemName]=useState('');
    const[itemDescription,setitemDescription]=useState('');

    //add item fun
    async function addItem(event){
        const token=localStorage.getItem('token');
        const user=jwt_decode(token);
        const userId=user.userId;
        event.preventDefault();
        // console.log('reach');
        const obj1=await fetch('https://my-tag.onrender.com/operation/additem',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({userId,itemName,itemDescription})
        })
        const data1=await obj1.json();
        if(data.status=='ok'){
            alert('Item added');
        }
        else(alert('Server Error'))
        getAllItems()
    }

   
    function itemClick(id){
        localStorage.setItem('itemId',id);
        window.location.href='/dashboard/'+id;
    }

    

    return <div className="Dashboard">
        <div><h1 className="name"><span>{"Dashboard"} </span><Link to="../logout" className="logoutlink">Logout</Link></h1></div> 
        
        <div className="dash-body">
            <div className="dash-cont-one">
                <form onSubmit={addItem}>
                    <input
                    value={itemName}
                    onChange={(e)=>setitemName(e.target.value)}
                    type="text"
                    placeholder="item-name"
                    required
                    className="item-name"
                    />
                    <input
                    value={itemDescription}
                    onChange={(e)=>setitemDescription(e.target.value)}
                    type="text"
                    placeholder="item description"
                    required
                    className="item-description"
                    />
                    <input type="submit" value="Add New Item"/>
                </form>

            </div>
            <div className="dash-cont-two">
                <div className="allitems">
                        {allItems.map((value,key)=>{
                            return(
                                <div className="item" onClick={(e)=>itemClick(value._id)}>
                                    <span class="material-symbols-outlined">work</span>
                                <h3>{value.itemName}</h3>
                                    
                                </div>
                            ) 
                        })}
                </div>
            </div>
            
        </div>

    </div>
}

export default Dashboard
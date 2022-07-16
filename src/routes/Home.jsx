import React from "react";
import { Link } from "react-router-dom";

import './css/home.css'

function Home(){
    return <div className="Home">
        <header>
        <span class="material-symbols-outlined">anchor</span>
        <Link to="./login"><button className="login-btn">Login</button></Link>
        </header>

        <div className="app-body">
            <div className="title-one">
                <h1>Secure your things with a tag...</h1>
                <div className="btn-div">
                    <Link to="./register"><button>Get tag</button></Link>
                    <Link to='./found-an-item'><button>Found an item</button></Link>
                </div>
            </div>
            <div className="img-one">
            <img src={require('./img155.png')} />
            </div>
        </div>
    </div>
}
export default Home;
//<img src={require('./sec.png')} />
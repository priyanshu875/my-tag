import React from "react";
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Register from "./routes/register";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard";
import Logout from "./routes/logout";
import Home from "./routes/Home";
import Item from "./routes/item";
import SendMsg from "./routes/sendmsg";

import './App.css';
// import logo from './anm.jpg'

function App() {
  return <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/dashboard/:itemId" element={<Item />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
        <Route path="/found-an-item" element={<SendMsg />} />
      </Routes>
      </BrowserRouter>




  </div>
}

export default App;

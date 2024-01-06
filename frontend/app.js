import React from "react";
import Login from "./login"
import Signup from "./signup"
import Home from "./home"

import { BrowserRouter,Routes,Route } from "react-router-dom";

function App(){
    return (
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/home" element={<Home />}/>
        </Routes>
     </BrowserRouter>
    )
}
export default App;
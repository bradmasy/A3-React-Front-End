import React from "react";
import "./Login.css";
import { useState } from "react";
import LoginForm from "./LoginForm/LoginForm"
import { ReactDOM } from "react";
import NavBar from "../../../Navigation/NavBar";
const Login = () => {

    const [loginSuccessful, setLoginSuccess] = useState([]);

    return (
        
        <div id="login">
            <NavBar/>
            
            <LoginForm loginSuccessful={loginSuccessful} setLoginSuccess={setLoginSuccess}/>
            
        </div>

      
    )
}

export default Login;
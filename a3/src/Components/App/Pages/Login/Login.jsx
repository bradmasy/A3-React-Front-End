import React from "react";
import "./Login.css";
import { useState } from "react";
import LoginForm from "./LoginForm/LoginForm"
import { ReactDOM } from "react";
import NavBar from "../../../Navigation/NavBar";
const Login = ({setHeaders,user,setUser}) => {

    return (
        
        <div id="login">
            <NavBar/>
            <LoginForm setHeader={setHeaders}/>
        </div>

      
    )
}

export default Login;
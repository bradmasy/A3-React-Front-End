import React from "react";
import NavBar from "../../../Navigation/NavBar";
import axios from "axios";
import { useEffect } from "react";

const logoutOfApp = async ()=>{
    const LOGOUT_API = "http://localhost:5000/api/v1/logout";

    const response = await axios.get(LOGOUT_API);
}
const Logout = ()=>{

    useEffect(()=>{
        const logOutUser = async ()=>{
            
            
            await logoutOfApp();
        }

        logOutUser();
    },[])

    return(<div id ="logout">
        <NavBar/>
        Thanks for hanging out

    </div>)
}

export default Logout;
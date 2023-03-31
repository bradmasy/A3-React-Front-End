import React from "react";
import "./LoginForm.css";
import axios from "axios";
import { useRef } from "react";
import {useNavigate} from "react-router-dom";


const LoginForm = ({ loginSuccessful, setLoginSuccess }) => {
    const nav = useNavigate();

    const passwordInput = useRef(null);
    const usernameInput = useRef(null);

    const login = async (_username, _password) => {
        console.log("user: " + _username);
        console.log("pass: " + _password)
        const MY_API = "http://localhost:5000/api/v1/login";
        const userData = {
            username: _username, //keannu
            password: _password //1234
        }

        const headers = {
            "Content-Type": "application/json",
        }

        const loginResponse = await axios.post(MY_API, userData, headers);

        console.log(loginResponse)

        const tokens  = loginResponse.data.authorization.split(" ");
        const access  = tokens[1];
        const refresh = tokens[3];

        nav("/home");
        
        console.log(access);
        console.log(refresh);
    };

    return (
        <div id="centre-login">
            <div id="login-form">
                <div id="form-container">
                    <div id="form">
                        <div id="form-elements-container">
                            <div id="form-elements">
                                <div id="title">
                                    Welcome To Poke-API
                                </div>
                                <div className="input-element">
                                    <div className="element-container">
                                        <div className="labels">
                                            <label>
                                                username:
                                            </label>
                                        </div>
                                        <div className="input-field" id="username-box">
                                            <input type="text" name="username" ref={usernameInput} />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-element" >
                                    <div className="element-container">
                                        <div className="labels">
                                            <label>
                                                password:
                                            </label>
                                        </div>
                                        <div className="input-field" id="password-box">
                                            <input type="password" name="password" ref={passwordInput} />
                                        </div>
                                    </div>
                                </div>
                                <div id="button-container">
                                    <button type="button" onClick={
                                        (e) => {
                                            e.preventDefault();
                                            login(usernameInput.current.value, passwordInput.current.value)
                                        }
                                    }>
                                        submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
import React from "react";
import "./LoginForm.css";


const LoginForm = ({ loginSuccessful, setLoginSuccess }) => {

    return (
        <div id="centre-login">
  <div id="login-form">
            <div id="form-container">
                <div id="form">
                    <div id="form-elements-container">
                        <div id="form-elements">
                            <div className="input-element">
                                <div className="element-container">
                                    <div className="labels">
                                        <label>
                                            username:
                                        </label>
                                    </div>
                                    <div className="input-field" id="username-box">
                                        <input type="text" name="username" />
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
                                        <input type="password" name="password" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button>
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
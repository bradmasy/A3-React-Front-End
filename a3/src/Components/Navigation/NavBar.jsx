import react from "react";
import "./NavBar.css";
import pokemonLogo from '../../Assets/Images/pokemon-logo.png';
import pokeBall from "../../Assets/Images/poke-ball.png";
import { useState } from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [type, updateType] = useState("");
    const [admin, updateAdmin] = useState("");
    const [history, updateHistory] = useState("");
    const [pokemon, updatePokemon] = useState("");

    return (

        <div id="nav-bar-styles">

            <div id="link-container-row">
                <div id="link-container-column">
                    <div id="title-row">
                        Pokemon API
                    </div>
                    <div id="nav-links-column">
                        <div id="nav-links-row">
                            <div className="link-container">
                                <div className="poke-ball-container">
                                    <img src={pokeBall}>
                                    </img>
                                </div>
                                <div className="link-title">
                                    <Link className="link" to="/"> Home</Link>
                                </div>

                            </div>
                            <div className="link-container">
                                <div className="poke-ball-container">
                                    <img src={pokeBall}>
                                    </img>
                                </div>
                                <div className="link-title">
                                <Link className="link" to="/"> Login</Link>
                                </div>
                            </div>
                            <div className="link-container">
                                <div className="poke-ball-container">
                                    <img src={pokeBall}>
                                    </img>
                                </div>
                                <div className="link-title">
                                    <Link className="link" to="/logout"> Logout</Link>
                                </div>
                            </div>
                            <div className="link-container">
                                <div className="poke-ball-container">
                                    <img src={pokeBall}>
                                    </img>
                                </div>
                                <div className="link-title">
                                    <Link className="link" to="/reports">Reports</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
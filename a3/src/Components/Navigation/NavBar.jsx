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


    /**
     *   return (
        <div id="nav-bar-styles">
            <div id="top-bar">
                <div id="poke-container">
                    <img id="poke-img" src={pokemonLogo}></img>
                </div>
            </div>
            <div id="bottom-bar">
                <div className="link">
                    Type
                </div>
                <div className="link">
                    Admin
                </div>
                <div className="link">
                    History
                </div>
                <div className="link">
                    Pokemon
                </div>
            </div>
        </div>
    );
     */

    /**
     * 
        <div id="nav-bar-styles">

            <div id="bottom-bar">
                <div className="link" id="poke-img-container">
                    <img id="poke-img" src={pokemonLogo}></img>
                    <div id="api-title">
                        The Poke-API
                    </div>
                </div>
                <div id="link-container">
                </div>
                <div className="link">
                    <div className="poke-ball-container">
                        <img src={pokeBall}></img>
                    </div>
                    <div className="title">
                        <div>
                            Type
                        </div>
                    </div>
                </div>
                <div className="link">
                    Admin
                </div>
                <div className="link">
                    History
                </div>
                <div className="link">
                    Pokemon
                </div>
            </div>
        </div>
     */
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
                                    <Link to="/"> Home</Link>
                                </div>

                            </div>
                            <div className="link-container">
                                <div className="poke-ball-container">
                                    <img src={pokeBall}>
                                    </img>
                                </div>
                                <div className="link-title">
                                <Link to="/"> Login</Link>
                                </div>
                            </div>
                            <div className="link-container">
                                <div className="poke-ball-container">
                                    <img src={pokeBall}>
                                    </img>
                                </div>
                                <div className="link-title">
                                    <Link to="/dashboard"> Dashboard</Link>
                                </div>
                            </div>
                            <div className="link-container">
                                <div className="poke-ball-container">
                                    <img src={pokeBall}>
                                    </img>
                                </div>
                                <div className="link-title">
                                    <Link to="/reports">Reports</Link>
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
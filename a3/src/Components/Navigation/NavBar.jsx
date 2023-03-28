import react from "react";
import "./NavBar.css";
import pokemonLogo from '../../Assets/Images/pokemon-logo.png';
import { useState } from "react";

const NavBar = () => {

    const [type, updateType] = useState("");
    const [admin,updateAdmin] = useState("");
    const [history, updateHistory] = useState("");
    const [pokemon, updatePokemon] = useState("");

    return (
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
}

export default NavBar;
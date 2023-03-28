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
                <div class="link">
                    Type
                </div>
                <div class="link">
                    Admin
                </div>
                <div class="link">
                    History
                </div>
                <div class="link">
                    Pokemon
                </div>
            </div>
        </div>
    );
}

export default NavBar;
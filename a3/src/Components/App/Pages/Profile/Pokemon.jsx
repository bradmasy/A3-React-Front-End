import React from "react";
import "./Pokemon.css"
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const Pokemon = ({headers, pokeInfo, pokeImg }) => {

    const nav = useNavigate();



    if (pokeInfo && pokeImg) {
        console.log(pokeInfo)
        const pokeName = pokeInfo["name"].english;
        console.log(pokeName);
        return (
            <div id="poke-container">
                <div id="poke-column">
                    <div id="poke-row">
                        <div id="poke-card">
                            <div id="info-container">
                                <div id="info-row">
                                    <div id="poke-img-container">
                                        <div id="poke-img">
                                            <img src={pokeImg}>
                                            </img>
                                        </div>


                                    </div>
                                    <div id="pokemon-stats-container">
                                        <div id="stats-column">
                                            <div className="stats-row">
                                                Name: {pokeInfo["name"].english}
                                            </div>
                                            <div className="stats-row">
                                                Type: {pokeInfo.type.map(e => e)}
                                            </div>
                                            <div className="stats-row">
                                                HP: {pokeInfo.base.HP}

                                            </div>
                                            <div className="stats-row">
                                                ATTACK: {pokeInfo.base.Attack}
                                            </div>
                                            <div className="stats-row">
                                                Defense: {pokeInfo.base.Defense}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div id="back">
                        <button onClick={(e) => {
                            
                            nav("/home", {headers: headers});
                        }}>
                            Back
                        </button>
                    </div>
                </div>

            </div>
        )
    }

}


export default Pokemon;
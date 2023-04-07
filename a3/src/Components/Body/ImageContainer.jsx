import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ImageContainer.css"


const ImageContainer = ({ imgs, pokemon}) => {

    return (

        <div id="imgs-container-column">
            <div id="img-container-row-align">
                <div id="imgs-container-row">
                    { 
                        imgs.map((img, index) => {
                            const key = `${img}-${index}`;
                            return (
                                <div key={key} className="poke-img-container-container">
                                    <div className="poke-img-container" key={key}>
                                        <div className="name">
                                            <label>{pokemon[(index)].name.english}</label>
                                        </div>
                                        <div className="poke-img">
                                            <img src={img}>
                                            </img>
                                        </div>
                                    </div>
                                    <div className="poke-img-container-back">
                                        <div>
                                            "hello"
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>)
}


export default ImageContainer;
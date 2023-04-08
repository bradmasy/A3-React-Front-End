import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ImageContainer.css"
import {useNavigate} from "react-router-dom";


const ImageContainer = ({ imgs, pokemon }) => {

    const nav = useNavigate();

    const firstRow = imgs.slice(0, 3);
    const secondRow = imgs.slice(3, 6);
    const thirdRow = imgs.slice(6, 9)

    return (

        <div id="imgs-container-column">
            <div id="img-container-row-align">
                <div id="imgs-container-row">
                    {
                        <React.Fragment>
                            <div className="img-row">
                            {firstRow.map((img, index) => {
                                const key = `${img}-${index}`;
                                return (
                                    <div key={key} className="poke-img-container-container" onClick={(e)=>{
                                    
                                    }}>
                                        <div className="poke-img-container" key={key}>
                                            <div className="name">
                                                <label>{pokemon[(index)].name.english}</label>
                                            </div>
                                            <div className="poke-img">
                                                <img src={img}>
                                                </img>
                                            </div>
                                        </div>
                                      
                                    </div>
                                
                                )
                               
                            })}
                            
                            </div>
                    
                        <div className="img-row">
                        {secondRow.map((img, index) => {
                            const key = `${img}-${index}`;
                            return (
                                <div key={key} className="poke-img-container-container" onClick={(e)=>{
                                    
                                }}>
                                    <div className="poke-img-container" key={key}>
                                        <div className="name">
                                            <label>{pokemon[(index +3)].name.english}</label>
                                        </div>
                                        <div className="poke-img">
                                            <img src={img}>
                                            </img>
                                        </div>
                                    </div>
                                
                                </div>
                            
                            )
                           
                        })}
                        
                        </div>

                        <div className="img-row">
                        {thirdRow.map((img, index) => {
                            const key = `${img}-${index}`;
                            return (
                                <div key={key} className="poke-img-container-container" onClick={(e)=>{
                                    let name = pokemon[(index + 6)].name.english;
                                    nav("/profile?name=" + name);
                                    console.log("clicked: " + name);

                                }}>
                                    <div className="poke-img-container" key={key}>
                                        <div className="name">
                                            <label>{pokemon[(index + 6)].name.english}</label>
                                        </div>
                                        <div className="poke-img">
                                            <img src={img}>
                                            </img>
                                        </div>
                                    </div>
                                    
                                </div>
                            
                            )
                           
                        })}
                        
                        </div>
                    </React.Fragment>
                      
                    }
                </div>
            </div>
        </div>)
}


export default ImageContainer;
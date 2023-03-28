import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ImageContainer.css"


const ImageContainer = ({ selection }) => {


    const POKEMON_URL = 'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json';

    const getImage = async (imageId) => {
        let IMAGE_URL = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${imageId}.png`;

        if (imageId < 10) {
            IMAGE_URL = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/00${imageId}.png`;
        }
        else if (imageId < 100) {
            IMAGE_URL = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/0${imageId}.png`;
        }

        return IMAGE_URL;

    }

    let baseImgs = [];
    const [imgs, setImgs] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    const login = async () => {
        const MY_API = "http://localhost:5000/api/v1/login";
        const userData = {
            username: "keannu",
            password: "1234"
        }

        const headers = {
            "Content-Type": "application/json",
        }

        const loginResponse = await axios.post(MY_API, userData, headers);
        const tokens = loginResponse.data.authorization.split(" ");
        const access = tokens[1];
        const refresh = tokens[3];
        setAccessToken(access);
        setRefreshToken(refresh);

    };

    const fetchImgs = async () => {
        const API_CALL = "http://localhost:5000/api/v1/pokemon-img";
        console.log("access " + accessToken);
        const headers = {
            "authorization": `Bearer ${accessToken} Refresh ${refreshToken}`,
            "Content-Type": "application/json"
        }
        const response = await axios.get(API_CALL, { headers });
        const imgPaths = response.data["image-paths"];
        //console.log(imgPaths)
        setImgs(imgPaths);
    }


    useEffect(() => {

        const loginAndGetImages = async () => {
            await login();
            await fetchImgs();
     
        };

        loginAndGetImages();
    }, [])

    return (
        <div id="imgs-container">

            {imgs.map( (url, i) =>{
                console.log("URL:" + url);
                <div className="poke-img-container">
                    <img src={url}>
                    </img>
                </div>
            })}
        </div>)
}


export default ImageContainer;
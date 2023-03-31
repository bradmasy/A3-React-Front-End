import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ImageContainer.css"


const ImageContainer = ({start, end, nImages, selection }) => {

    const [imgs, setImgs] = useState([]);
    const [pokemon,setPokemon] = useState([]);
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
        console.log(access);
        console.log(refresh);
    };

    const fetchImgs = async () => {
        const API_CALL = "http://localhost:5000/api/v1/pokemon-img";
        console.log("access " + accessToken);
        const headers = {
            "authorization": `Bearer ${accessToken} Refresh ${refreshToken}`,
            "Content-Type": "application/json"
        }
        const response = await axios.get(API_CALL, { headers });
        console.log(response);
        const imgPaths = response.data["image-paths"];
        let chosenImages = [];
        for(let i = 0; i < nImages; i++){
            chosenImages.push(imgPaths[i]);
        }
        console.log(imgPaths)
        setImgs(chosenImages);
    }


    const getPokeInfo = async () => {
        const API_CALL = "http://localhost:5000/api/v1/pokemons";
        const headers = {
            "authorization": `Bearer ${accessToken} Refresh ${refreshToken}`,
            "Content-Type": "application/json"
        }
        const response = await axios.get(API_CALL, { headers });
        const pokemonInfo = response.data;
        console.log(pokemonInfo);
        setPokemon(pokemonInfo);
    }


    useEffect(() => {
        const loginAndGetImages = async () => {
            await login();
        };

        loginAndGetImages();
    }, [])

    useEffect(() => {
        const getImgUrls = async () => {
            await getPokeInfo();
            await fetchImgs();
        }
        getImgUrls();
    }, [accessToken]) // when access token gets updated this will get called.


    return (

        <div id="imgs-container-column">
            <div id="imgs-container-row">
                {
                    imgs.map((img, index) => {
                        return (
                            <div className="poke-img-container" key={img}>
                                <div className="name">
                                    <label>{pokemon[index].name.english}</label>
                                </div>
                                <div className="poke-img">
                                    <img src={img}>
                                    </img>
                                </div>

                            </div>
                        )
                    })
                }

            </div>


        </div>)


}


export default ImageContainer;
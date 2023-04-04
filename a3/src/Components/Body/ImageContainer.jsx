import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ImageContainer.css"


const ImageContainer = ({ headers, start, end, nImages, selection }) => {

    const [imgs, setImgs] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    const fetchImgs = async () => {
        console.log("selection: " + selection);
        console.log("images being fetched................");
        const API_CALL = "http://localhost:5000/api/v1/pokemon-img";
        console.log("access " + accessToken);
        const headers = {
            "authorization": `Bearer ${accessToken} Refresh ${refreshToken}`,
            "Content-Type": "application/json"
        }

        const response = await axios.get(API_CALL, { headers });
        const imgPaths = response.data["image-paths"];
        const selectionIDs = pokemon.map((poke) => poke.id);
        let selectedImgPaths = [];
        console.log(selectionIDs)


        const selectionIDSet = new Set(selectionIDs);

        for (let i = 0; i < imgPaths.length; i++) {
            const urlParts      = imgPaths[i].split("/");
            const fileNameParts = urlParts[urlParts.length - 1].split(".");
            const pokemonNumber = parseInt(fileNameParts[0]);

            if (selectionIDSet.has(pokemonNumber)) {
                selectedImgPaths.push(imgPaths[i]);
            }
        }



        // for (let i = 0; i < imgPaths.length; i++) {
        //     for (let j = 0; j < selectionIDs.length; j++) {

        //         const urlParts = imgPaths[i].split("/");
        //         const fileNameParts = urlParts[urlParts.length - 1].split(".");
        //         const pokemonNumber = parseInt(fileNameParts[0]);

        //         if (pokemonNumber === selectionIDs[j]) {
        //             selectedImgPaths.push(imgPaths[i]);
        //             break;
        //         }
        //     }
        // }

        selectedImgPaths = selectedImgPaths.length < 1 ? imgPaths.slice(0, nImages) : selectedImgPaths.slice(0, nImages);

        setImgs(selectedImgPaths);
    }

    /**
     * Gets the information for the pokemon.
     */
    const getPokeInfo = async () => {
        const API_CALL = "http://localhost:5000/api/v1/pokemons";
        const authHeaders = {
            "authorization": `Bearer ${accessToken} Refresh ${refreshToken}`,
            "Content-Type": "application/json"
        }

        const response = await axios.get(API_CALL, { headers: authHeaders });
        const pokemonInfo = response.data;
        console.log(pokemonInfo)

        pokemonInfo.sort((a, b) => a.id - b.id);
        console.log(pokemonInfo)

        const filteredPokemon = selection.length < 1 ? pokemonInfo : pokemonInfo.filter(p => {
            return selection.some(type => p.type.includes(type));
        })
        console.log("---------------------filtered----------------------");
        console.log(filteredPokemon);

        setPokemon(filteredPokemon);
    }

    useEffect(() => {
        const setMyTokens = async () => {
            const parseArr = await headers.authorization.split(" ");
            setAccessToken(parseArr[1]);
            setRefreshToken(parseArr[3]);
        }

        setMyTokens();
    }, [])

    useEffect(() => {
        const getImgUrls = async () => {
            await getPokeInfo();
        }

        getImgUrls();
    }, [accessToken, selection, start]) // when access token gets updated this will get called.

    useEffect(() => {
        const fetch = async () => {
            await fetchImgs();
        }
        fetch();
    }, [pokemon]);

    return (

        <div id="imgs-container-column">
            <div id="img-container-row-align">
                <div id="imgs-container-row">
                    {
                        imgs.map((img, index) => {
                            const key = `${img}-${index}`;
                            return (
                                <div className="poke-img-container" key={key}>
                                    <div className="name">
                                        <label>{pokemon[(index)].name.english}</label>
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
            </div>
        </div>)
}


export default ImageContainer;
import React, { useEffect } from "react";
import NavBar from "../../../Navigation/NavBar";
import CheckBoxes from "../../../Body/CheckBoxes";
import ImageContainer from "../../../Body/ImageContainer";
import { useState } from 'react';
import PageButtons from "../../../Body/PageButtons"
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Reports from "../Reports/Reports";

const Home = ({ headers, setHeaders }) => {

    const AMOUNT_OF_POKE = 9;
    const [selection, setSelection] = useState([]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(9);
    const [current, setCurrent] = useState(1);
    const [access, setAccess] = useState("");
    const [refresh, setRefresh] = useState("");
    const [imgs, setImgs] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [admin, setAdmin] = useState(false);


    const setVariables = async () => {
        const splitHeader = headers.authorization.split(" ");
        setAccess(splitHeader[1]);
        setRefresh(splitHeader[3]);
    }

    const getPokeInfo = async () => {
        const API_CALL = "http://localhost:5000/api/v1/pokemons";

        const authHeaders = {
            "authorization": `Bearer ${access} Refresh ${refresh}`,
            "Content-Type": "application/json"
        }

        const response    = await axios.get(API_CALL, { headers: authHeaders });
        console.log(response.data.token);
        if(response.data.token.admin){
            setAdmin(true)
;        }
        const pokemonInfo = response.data.data;

        pokemonInfo.sort((a, b) => a.id - b.id);

        let filteredPokemon = selection.length < 1 ? pokemonInfo : pokemonInfo.filter(p => {
            return selection.some(type => p.type.includes(type));
        })

        console.log(filteredPokemon);

        if (start > 1) {
            const updatedStart = parseInt(AMOUNT_OF_POKE) * parseInt(start);
            console.log(updatedStart)
            filteredPokemon = filteredPokemon.slice(updatedStart - AMOUNT_OF_POKE, updatedStart);
        }

       return filteredPokemon;
    }

    const fetchImgs = async () => {

        const API_CALL = "http://localhost:5000/api/v1/pokemon-img"; // api call
        const headers = {
            "authorization": `Bearer ${access} Refresh ${refresh}`,
            "Content-Type": "application/json"
        }

        const response       = await axios.get(API_CALL, { headers });
        const imgPaths       = response.data["image-paths"];
        const selectionIDs   = pokemon.map((poke) => poke.id);
        console.log(selectionIDs)
        let selectedImgPaths = [];

        const selectionIDSet = new Set(selectionIDs);

        for (let i = 0; i < imgPaths.length; i++) {
            const urlParts      = imgPaths[i].split("/");
            const fileNameParts = urlParts[urlParts.length - 1].split(".");
            const pokemonNumber = parseInt(fileNameParts[0]);

            if (selectionIDSet.has(pokemonNumber)) {
                selectedImgPaths.push(imgPaths[i]);
            }
        }

        selectedImgPaths = selectedImgPaths.length < 1 ? imgPaths.slice(0, AMOUNT_OF_POKE) : selectedImgPaths.slice(0, AMOUNT_OF_POKE);
        return selectedImgPaths;
    }

    useEffect( () => {
        const grabPokemon = async () => {
            await setVariables();
            console.log("access: " + access);
            if(access && refresh){
                const pokes = await getPokeInfo();
                setPokemon(pokes);
         
            }
        }

        grabPokemon();

    }, [access,refresh,selection,start]);

    useEffect( () => {
        const setImg = async () => {
            console.log(pokemon)
            if(pokemon.length > 1){
                const selectedImages  = await fetchImgs();
                setImgs(selectedImages);
            }    
        }

        setImg();

    }, [pokemon]);

    /**
     * redirect to admin dashboard
     */
    if(admin){ 
        return <Reports headers={headers}/>
    }

    return (
    
        <div>
            <NavBar />
            <CheckBoxes selection={selection} setSelection={setSelection} />
            <ImageContainer imgs={imgs} pokemon={pokemon} />
            <PageButtons current={current} setCurrent={setCurrent} amount={AMOUNT_OF_POKE} start={start} end={end} setStart={setStart} setEnd={setEnd} selection={selection} setSelection={setSelection} />
        </div>
    )

}

export default Home;
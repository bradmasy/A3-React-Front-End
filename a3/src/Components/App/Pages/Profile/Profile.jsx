import React, { useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import NavBar from "../../../Navigation/NavBar";
import Pokemon from "./Pokemon";
import { useEffect } from "react";
import axios from "axios";


const Profile = ({headers}) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("name");
    const [pokemonInformation,setPokemonInformation] = useState();
    const [pokeImage, setPokeImage] = useState();
    const pokeStyles = {
        display: "flex",
        "flex-direction": "column",
        height: "100%",
        width: "100%"
    }
    console.log(id);

    const getPoke = async() => {
        console.log(id);
        const API_CALL = `http://localhost:5000/api/v1/pokemon-name/name=${id}`;
        const response = await axios.get(API_CALL);
        console.log(response.data[0])
        setPokemonInformation(response.data[0]);

     
    }

    useEffect(() => {
        const pokeInf = async() =>{
            await getPoke();

           
        }
      
        pokeInf();
    },[id])


    useEffect(()=>{
        const getImg = async() =>{
            console.log(pokemonInformation)
            if(pokemonInformation){
            const IMG_API_CALL = `http://localhost:5000/api/v1/pokemon-img/${pokemonInformation.id}`;
            const response_two = await axios.get(IMG_API_CALL);
            console.log(response_two.data)
            setPokeImage(response_two.data)
            }
        }
        getImg();
    },[pokemonInformation])

    return(
    <div style={pokeStyles}>
        <NavBar/>
        <Pokemon headers={headers} pokeInfo={pokemonInformation} pokeImg={pokeImage}/>

    </div>)
}



export default Profile;
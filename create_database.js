const axios = require("axios");
const dotenv = require("dotenv");
const Pokemon = require("../A3-React-Front-End/models/pokemon_model");
const db = require("./database/db");
dotenv.config();
const POKEMON_API_URL = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
function create_database() {

    axios.get(POKEMON_API_URL)
        .then((response) => {
            console.log(response.data);
            Pokemon.insertMany(response.data, (err, pokemon) => {
                if(err){
                    console.log(err);
                } else{
                    console.log(pokemon);
                }
            });
        });


};


create_database();
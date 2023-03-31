const axios = require("axios");
const dotenv = require("dotenv");
const Pokemon = require("../A3-React-Front-End/models/pokemon_model");
const db = require("./database/db");
dotenv.config();

function delete_database() {

    Pokemon.deleteMany({}, { batchSize: 100 }, (err, pokemon) => {
        if (err) {
            console.log(err);
        } else {
            console.log(pokemon);
        }
    });
};


delete_database();
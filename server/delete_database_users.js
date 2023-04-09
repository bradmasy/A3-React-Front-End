const axios = require("axios");
const dotenv = require("dotenv");
const Users = require("./models/user_model");
const db = require("./database/db");
dotenv.config();

function delete_database() {

    Users.deleteMany({}, { batchSize: 100 }, (err, users) => {
        if (err) {
            console.log(err);
        } else {
            console.log(users);
        }
    });
};


delete_database();
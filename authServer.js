const express = require("express");
const app = express();
const axios = require("axios");
const User = require("../models/user_model")
const JWT = require("jsonwebtoken");
const env = require("dotenv");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const PokeError = require("../exceptions/PokeError");
const PokeAuthError = require("../exceptions/PokeAuthError");
env.config();

app.listen(process.env.AUTH_PORT,() =>{
    console.log(`Running on ${process.env.AUTH_PORT}`)
})


app.get("/api/v1/requestNewAccessToken", (req, res) => {
    const { _username } = req.body;
    const { accessToken } = req.body;


    if(accessToken){

    }

    res.status(201).json({ refreshToken: JWT.sign({ username: _username }, process.env.ACCESS_TOKEN_SECRET) });

})

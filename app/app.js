const express = require("express");
const app = express();
const Pokemon = require("../models/pokemon_model");
const User = require("../models/user_model")
const JWT = require("jsonwebtoken");
const env = require("dotenv");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const PokeAuthError = require("../exceptions/PokeAuthError");
const InvalidPokeToken = require("../exceptions/InvalidPokeToken");
const AdminAuthError = require("../exceptions/AdminAuthError");
const IllegalArgumentError = require("../exceptions/IllegalArgumentError");
const IllegalRouteException = require("../exceptions/IllegalRouteException");
const PokeError = require("../exceptions/PokeError");

env.config();

app.use(cors({
    exposedHeaders: ['auth-token-access', 'auth-token-refresh', "authorization"]
}));

app.use(cors());

let authTokens = [];
let refreshTokens = [];


const parseHeader = (headerString) => {
    let tokens = [];

    console.log(headerString);
    if (headerString === null || headerString === undefined || headerString === " ") {
        tokens.push(null);
        tokens.push(null);
        return tokens;
    }
    const splitHeader = headerString.split(" ");

    tokens.push(splitHeader[1]);
    tokens.push(splitHeader[3]);
    return tokens;
}

const verifyToken = async (req, res, next) => {

    let header = req.header("authorization");
    console.log("HEADER: " + header);
    console.log(header);
    let authorizationTokens = parseHeader(header);

    const access_authHeader = authorizationTokens[0]; //req.header("auth-token-access");
    const refresh_authHeader = authorizationTokens[1];//req.header("auth-token-refresh");

    console.log(access_authHeader);
    console.log(refresh_authHeader);


    try {

        if (!access_authHeader || access_authHeader === "null") {
            throw new PokeAuthError("Unauthorized, no access token. Please login again");
        }

        if (!refresh_authHeader || refresh_authHeader === "null") {
            throw new PokeAuthError("Unauthorized, no access token. Please login again");
        }

        const real_token = JWT.verify(access_authHeader.trim(), process.env.ACCESS_TOKEN_SECRET);

        if (!real_token || real_token === undefined) {
            throw new InvalidPokeToken("Invalid Token. Log back in for new Tokens.");
        }

        next();

    } catch (err) {
        //     console.log(err);
        if (err.name === "TokenExpiredError") return res.status(403).json({ "status": 403, "error": err.message });
        if (err.name === "JsonWebTokenError") return res.status(407).json({ "status": 407, "error": err.message });

        return res.status(err.errorCode).json({ "status": err.errorCode, "error": err.message });

    }
}


const authorizeAdmin = async (req, res, next) => {

    let header = req.header("authorization");
    let authorizationTokens = parseHeader(header);

    const access_authHeader = authorizationTokens[0]; // req.header("auth-token-access");
    const refresh_authHeader = authorizationTokens[1]; //req.header("auth-token-refresh");

    const token = JWT.verify(access_authHeader.trim(), process.env.ACCESS_TOKEN_SECRET);

    try {

        if (!token.admin) throw new AdminAuthError("Invalid Administrator. No Access Permitted.")
    } catch (err) {
        console.log(err);
        res.status(err.errorCode).json({ "status": err.errorCode, "error": err.message });
    }

    next();
}

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());

const disposeTokens = async (arr) => {
    while (arr.length) {
        arr.pop();
    }
}

app.get("/api/v1/logout", async (req, res) => {

    await disposeTokens(refreshTokens);
    await disposeTokens(authTokens);

    res.header("authorization", null);


    res.status(200).json({
        "message": "successfully signed out"
    })


})

app.get("/api/v1/register", (req, res) => {
    res.send(`<form method="post" action="/api/v1/register">
    <label>username</label>
    <input name="username"> <br>
    <label>password</label>
    <input name="password" type="password"> 
    <br>
    <label>first name</label>
    <input name="fname" type="text"> 
    <br>
    <label>last name</label>
    <input name="lname" type="text"> 
    <br>
    <button type="submit">Submit</button>
   
</form>`)
})

app.post("/api/v1/register", async (req, res) => {

    let username = null;
    let password = null;
    let first = null;
    let last = null;
    let admin = null;
    console.log(req.body)
    try {
        username = req.body.username;
        password = req.body.password;
        first = req.body.fname;
        last = req.body.lname;
        admin = true;

        if (username === undefined
            || password === undefined
            || first === undefined
            || last === undefined
            || admin === undefined) {
            throw new IllegalArgumentError("Incorrect Payload.");
        }

        let salt = bcrypt.genSaltSync(10);
        const hashed = await bcrypt.hash(password, salt);
        console.log(hashed);
        console.log(salt);
        let userData = {
            username: username,
            admin: admin,
            fname: first,
            lname: last,
            password: hashed,
            token: null
        }

        const token = JWT.sign({
            data: userData
        }, process.env.ACCESS_TOKEN_SECRET);

        userData.token = token;
        User.create(userData, (err, data) => {
            if (err)
                console.log(err);
            console.log(data);

            res.status(201).json({ token: token, data: data, message: "User successfully registered" });

        })
    } catch (err) {
        res.status(err.errorCode).json({ "status": err.errorCode, "error": err.message });
    }
})

app.get("/api/v1/requestNewAccessToken", (req, res) => {
    // const { _username } = req.body;
    let authTokens = req.get("authorization");

    const splitHeader = authTokens.split(" ");

    let accessToken = null;
    let refreshToken = null;
    try {
        accessToken = splitHeader[1].trim(); // give the token
        refreshToken = splitHeader[3].trim();

        if (accessToken === "null" || refreshToken === "null") {
            console.log("NULLLL")
            throw new PokeAuthError("Invalid Tokens.");
        } else {
            let validAccess = null;
            let validRefresh = null;

            validAccess = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            validRefresh = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            try {
                if (validRefresh) {
                    res.status(201).json({ refreshToken: JWT.sign({ username: validRefresh.username }, process.env.ACCESS_TOKEN_SECRET) });
                }

                throw new PokeAuthError("Invalid Tokens.");

            } catch (err) {
                console.log(err);
                res.status(err.errorCode).json({
                    "status": err.errorCode,
                    "message": err.message
                })
            }

        }

    } catch (err) {
        console.log(err);
        res.status(err.errorCode).json({
            "status": err.errorCode,
            "message": err.message
        })
    }



})

app.get("/api/v1/login", (req, res) => {
    console.log(req.body);
    res.send(`<form method="post" action="/api/v1/login">
            <label>username</label>
            <input name="username"> <br>
            <label>password</label>
            <input name="password" type="password"> 
            <br>
            <button type="submit">Submit</button>
    </form>`)
    console.log("Login route");
})

app.post("/api/v1/login", (req, res) => {
    let _username = null;
    let _password = null;

    try {
        if (req.body.username === undefined || req.body.password === undefined) {
            throw new IllegalArgumentError("Illegal Arguments.")
        }
        _username = req.body.username
        _password = req.body.password

        User.findOne({ username: _username }, async (err, data) => {
            if (err) { console.log(err); }

            try {
                if (data == null) throw new PokeAuthError("Invalid Login Credentials");

                const isPasswordMatch = await bcrypt.compare(_password, data.password);

                if (isPasswordMatch) {
                    let accessToken;
                    let refreshToken;
                    let options = { expiresIn: "24hr" };

                    if (data.admin) {
                        accessToken = JWT.sign({ username: _username, admin: true }, process.env.ACCESS_TOKEN_SECRET, options);
                        refreshToken = JWT.sign({ username: _username, admin: true }, process.env.REFRESH_TOKEN_SECRET);
                    } else {
                        accessToken = JWT.sign({ username: _username }, process.env.ACCESS_TOKEN_SECRET, options);
                        refreshToken = JWT.sign({ username: _username }, process.env.REFRESH_TOKEN_SECRET);
                    }

                    let authorization = `Bearer ${accessToken} Refresh ${refreshToken}`;

                    res.header("authorization", authorization);

                    res.status(200).json({ "Access": accessToken, "Refresh": refreshToken, "authorization": authorization });

                } else {
                    throw new PokeAuthError("Invalid Login Credentials");
                }
            } catch (err) {
                console.log(err);
                res.status(401).json({ "error": 401, "message": err.message });
            }
        })
    } catch (err) {
        res.status(err.errorCode).json({ "message": err.message });
    }

})


// Route # 1

app.get("/api/v1/pokemons/", verifyToken, (req, res) => {

    let queryCount = req.query.count;
    let queryAfter = req.query.after;

    Pokemon.find({}, (err, pokemon) => {
        console.log("pokemon = " + pokemon)
        if (err) {
            res.status(400).json("error getting pokemon");
        }
        else if (!pokemon) {
            res.status(404).json("No pokemon found");
        } else {
            let pokemonQuery = pokemon.slice(queryAfter, pokemon.length);
            let pokemonResult = pokemonQuery.slice(0, queryCount);
            res.status(200).json(pokemonResult);
        }


    })


})

app.get("/api/v1/pokemon-img", verifyToken, (req, res) => {

    let imagePaths = [];

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

    Pokemon.find({}, async (err, pokemon) => {
        //console.log("pokemon = " + pokemon)
        if (err) {
            res.status(400).json("error getting pokemon");
        }
        else if (!pokemon) {
            res.status(404).json("No pokemon found");
        } else {
            for (let i = 0; i < pokemon.length; i++) {
                let imgUrl = await getImage(i);
              //  console.log(imgUrl);
                imagePaths.push(imgUrl);
            }
            res.status(200).json({"image-paths":imagePaths});
        }
    })



})


app.post("/api/v1/pokemon", verifyToken, (req, res) => {

    console.log("req.body: " + req.body.id)
    Pokemon.create(req.body, (err, pokemon) => {
        console.log("pokemon: " + pokemon);
        let json = {};
        let status;
        if (err) {
            console.log(err);
            json.msg = "error creating pokemon";
            status = 400;
        }
        else {
            console.log(/^[a-zA-Z]{1,20}$/.test(pokemon.name.english));
            if (/^[a-zA-Z]{1,20}$/.test(pokemon.name.english)) {
                status = 201;
                json.msg = "Added Successfully";
            } else {
                status = 400;
                json.msg = "11000";
            }
        }

        res.status(status).json(json);
    })
})

// Route # 3

app.get('/api/v1/pokemon/:id', verifyToken, async (req, res) => {
    let poke_id = req.params.id;
    const pokemon = await Pokemon.find();
    let poke = pokemon.find(p => p.id == poke_id);
    let pokeArr = [poke];

    if (poke) {
        res.status(200).json(pokeArr);
    } else {
        let json = {};
        if (poke_id.search("[^a-zA-Z]{1,}")) {
            json.errMsg = "Cast Error: pass pokemon id between 1 and 811";
        } else {
            json.errMsg = "Pokemon not found";
        }

        res.status(404).json(json);
    }
})


app.put('/api/v1/pokemon/:id', verifyToken, authorizeAdmin, async (req, res) => {
    // try {
    const selection = { id: req.params.id }
    const update = req.body
    const options = {
        new: true,
        runValidators: true,
        overwrite: true
    }

    const doc = await Pokemon.findOneAndUpdate(selection, update, options)

    if (doc) {
        res.json({
            msg: "Updated Successfully",
            pokeInfo: doc
        })
    }
})

/**
 * Illegal Routes
 */
app.get("/api/v1/*", (req, res, next) => {

    try {
        throw new IllegalRouteException("Illegal Router. Try again.")
    } catch (err) {
        console.log(err);
        //next(err)
        res.status(err.errorCode).json({ "status": err.errorCode, "message": err.message });
    }
})


module.exports = app;
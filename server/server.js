const app = require("./app/app");
const db = require("./database/db");
const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.APP_PORT, () => {
    console.log("server is running on port 5000")
})



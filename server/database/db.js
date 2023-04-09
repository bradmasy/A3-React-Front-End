const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://neo:morpheus123@cluster0.uyvkmyh.mongodb.net/ISA?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

module.exports = db;
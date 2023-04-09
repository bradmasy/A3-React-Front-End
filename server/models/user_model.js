const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    admin: { type: Boolean, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    password: { type: String, required: true },
    dateSignedUp: { type: Date, required: true },
    accessed: {
        type: [{
            route: { type: String, required: true },
            date: { type: String, required: true },
            time:{type: String,required:true}
        }], required: true
    }

}, { collection: "users" })

const User = mongoose.model("user", userSchema);

module.exports = User;
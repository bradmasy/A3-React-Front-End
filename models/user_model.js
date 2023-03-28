const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    admin:{type: Boolean, required: true},
    fname:{type: String, required: true},
    lname:{type: String, required: true},
    password:{type:String,required:true},
    token:{type: String, trim:true, default:null}

},{collection:"users"})

const User = mongoose.model("user", userSchema);

module.exports = User;
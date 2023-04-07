const mongoose = require("mongoose");


const errorLogSchema = new mongoose.Schema({
    errorNumber:{type:Number, required:true},
    errorName:{type:String, required:true},
    errorMessage:{type:String,required:true},
    username:{type:String, required:false},
    date:{type:Date,required:true}
})


const ErrorLog = mongoose.model("errorLog", errorLogSchema);

module.exports = ErrorLog;
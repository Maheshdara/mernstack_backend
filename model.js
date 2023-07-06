const mongoose = require("mongoose");

const  AdminData = new mongoose.Schema({

    email:{
        type:"string",
        required:true
    },
    password:{
        type:"string",
        required:true
    }


})

module.exports = mongoose.model("AdminData",AdminData);
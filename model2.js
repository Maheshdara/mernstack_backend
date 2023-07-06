const mongoose = require("mongoose");

const Videodata = new mongoose.Schema({
    videotitle: {
        type: "string",
        required: true
    },
    videourl: {
        type: "string",
        required: true
    }, videodescription: {
        type: "string",
        required: true
    },
    thumbnail: {
        type: "string",
        required: true
    },


})

module.exports = mongoose.model("Videodata", Videodata);
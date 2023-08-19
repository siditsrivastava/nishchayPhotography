const mongoose = require("mongoose");

const videoLink = mongoose.Schema({
    video : {
        type:String,
        require : true
    }
})

module.exports = videoData = mongoose.model("VIDEOSECTION" , videoLink)
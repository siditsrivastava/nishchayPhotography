const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    image : String,
    category : String
})

module.exports = galleryImage = mongoose.model("galleryImage" , ImageSchema)


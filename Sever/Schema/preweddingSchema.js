const mongoose = require("mongoose");

const preweddingSchema = mongoose.Schema({
    image : String,
})

module.exports = preWeddingImage = mongoose.model("PreWeddingImage" , preweddingSchema)


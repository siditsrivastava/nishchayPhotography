const mongoose = require("mongoose");

const faqSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = faqQuestion = mongoose.model("FAQQUESTIONANSWER", faqSchema);


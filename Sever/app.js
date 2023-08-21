const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});
app.use(cors());

app.use(bodyParser.json());
app.use(require("./route"));
app.use(express.json());
console.log("sidit Srivastava");
app.listen(4000, () => {
  console.log("sever runn in the localhost 4000");
});
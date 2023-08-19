const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const compression = require("compression");

dotenv.config({
  path: "./config.env",
});
app.use(cors());
app.use(compression({
  level:6,
  threshold:100*10000,
  filter:(req, res) => {
    if(req.header['x-no-compression']){
      return false
    }
    return compression.filter(req,res);
  }
}));
app.use(bodyParser.json());
app.use(require("./route"));
app.use(express.json());
console.log("sidit Srivastava");
app.listen(4000, () => {
  console.log("sever runn in the localhost 4000");
});
app.get("/", (req, res) => {
  res.send("hello");
});

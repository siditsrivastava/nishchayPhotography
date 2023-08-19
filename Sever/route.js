const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const dotenv = require("dotenv");
const faqQuestion = require("./Schema/faqSchema");
const galleryImage = require("./Schema/imageSchema");
const nodemailer = require("nodemailer");
const videoData = require("./Schema/videoSchema");
const imageSchema = require("./Schema/imageSchema");
const path = require("path");
const preWeddingImage = require("./Schema/preweddingSchema");
router.use(express.static("uploads"));
router.use(express.static("prewedding"));


dotenv.config({
  path: "./config.env",
});

router.use(express.json());

// Connect the node to the Data base !!!

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DATABASEURL, {
      useNewUrlParser: true,
    });
    console.log("connected Successfully");
  } catch (err) {
    console.log("Not Successfully Connected !!");
  }
};
connectDB();

//  getting faq Data From the Data Base !!

router.get("/faqquestion", async (req, res) => {
  let faqQuestionAnswer = await faqQuestion.find().sort({ _id: -1 });
  if (faqQuestionAnswer) {
    res.json(faqQuestionAnswer);
  } else {
    res.send({ error: "No data Found !!" });
  }
});

//   posting faq data in the Data Base !!

router.post("/faq", async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(422).json({ error: "Please Provide the data " });
  }
  try {
    const faq = await faqQuestion.create({
      question,
      answer,
    });
    await faq.save();
    return res.status(201).json({ message: "Submitted Successfully" });
  } catch (err) {
    console.log(err);
  }
});

//   Upload the Image in the gallery section !!

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    await imageSchema
      .create({
        category: req.body.category,
        image: req.file.filename,
      })
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// Upload the Prewedding Image to the data base !!

const preweddingImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "prewedding");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const preweddingImgUpload = multer({
  storage: preweddingImageStorage,
});

router.post(
  "/prewedddingImgUpload",
  preweddingImgUpload.single("image"),
  async (req, res) => {
    try {
      await preWeddingImage
        .create({
          image: req.file.filename,
        })
        .then((result) => {
          res.json(result) });
    } catch (err) {
      console.log(err);
    }
  }
);

router.get('/getPreweddingPhoto', async (req, res) => {
    const preweddingResult = await preWeddingImage.find().sort({_id: -1});
    if(preweddingResult){
      res.json(preweddingResult);
    }
    else {
      res.send({erroe : "No Image Found"})
    }
})

// Getting the Image from the Data Base !!

router.get("/getImage", async (req, res) => {
  try {
    let galleryphoto = await galleryImage.find().sort({ _id: -1 });
    if (galleryphoto) {
      res.json(galleryphoto);
    } else {
      res.send({ error: "No Data Found " });
    }
  } catch (err) {
    console.log(err);
  }
});

// Sending the video to the Database

router.post("/videoupload", async (req, res) => {
  try {
    const { video } = req.body;
    if (!video) {
      return res.status(422).json(" Please Provide Email valid !!! ");
    } else {
      const youtubeVideo = await videoData({
        video: video,
      });
      await youtubeVideo
        .save()
        .then(() => {
          return res.status(201).json("SUCCESS");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/videofetching", async (req, res) => {
  try {
    const fetchingVideoData = await videoData.find().sort({ _id: -1 });
    if (!fetchingVideoData) {
      return res.status(422).json("Data is not Fetching !!");
    } else {
      return res.status(201).send(fetchingVideoData);
    }
  } catch (err) {
    console.log(err);
  }
});

//   Sending the Conatct Data to the Email

router.post("/contact", async (req, res) => {
  const {
    userbridename,
    usergroomname,
    useremail,
    usernumber,
    userweddingdate,
    userweddingdetails,
  } = req.body;
  if (
    !userbridename ||
    !usergroomname ||
    !useremail ||
    !usernumber ||
    !userweddingdate ||
    !userweddingdetails
  ) {
    console.log("Please Provide the Email Address !!");
  } else {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const mailOption = {
        from: useremail,
        to: process.env.EMAIL,
        subject: "CLIENT ENQUIRY",
        text: userbridename,
        html: `Hello My Self :- ${userbridename} and my Groome Name is :- ${usergroomname}
         and Email Id is :- ${useremail} and my Contact Number is ${usernumber} and my Wedding Date :- ${userweddingdate}
        and ${userweddingdetails}. `,
      };
      async function main() {
        const info = await transporter.sendMail(mailOption, (error, info) => {
          if (error) {
            console.log("ERROR", error);
          } else {
            console.log("Email Sent " + info.message);
            res.status(201).json({ status: 201, info });
            res.json(info);
          }
        });
      }
      main().catch(console.error);
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;

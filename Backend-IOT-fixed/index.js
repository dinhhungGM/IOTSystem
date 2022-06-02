var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const argon2 = require("argon2");
const user = require("./model/user");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://l156123:660097@cluster0.ifpr5pp.mongodb.net/IOT?retryWrites=true&w=majority",
  async (err) => {
    if (!err) {
      // const adpassword = "password"
      // const adminpassword = await argon2.hash(adpassword)
      // const useradmin = new user({
      //     Name:"Tan Loc",
      //     userName:"admin",
      //     password:adminpassword
      // })
      //   await useradmin.save()
      console.log("db connected");
    } else console.log("db error");
  }
);
app.use(express.json());
app.use(express.static(__dirname + "/views"));
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App has started at http://localhost:" + port);
});

app.use("/", express.static("./"));
app.use("/", express.static("./views/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);
const sensorRouter = require("./routes/sensor");
app.use("/sensor", sensorRouter);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

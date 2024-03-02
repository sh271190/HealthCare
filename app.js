var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const port = 5151;
const app = express();

//static file
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// database connectivity

mongoose.connect("mongodb://127.0.0.1:27017/dcare", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

//call static folder files

app.use("./css", express.static(__dirname + "public/css"));
app.use("./img", express.static(__dirname + "public/img"));
app.use("./js", express.static(__dirname + "public/js"));
app.use("./images", express.static(__dirname + "public/images"));
app.use("./scss", express.static(__dirname + "public/scss"));
app.use("./sound", express.static(__dirname + "public/sound"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/doctor", (req, res) => {
  res.render("doctor");
});

app.get("/department", (req, res) => {
  res.render("department");
});

app.get("/pricing", (req, res) => {
  res.render("pricing");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contactdata", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let message = req.body.message;

  let data = {
    name: name,
    email: email,
    mobile: mobile,
    message: message,
  };

  db.collection("contact").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.render("index");
});

app.get("/appointment", (req, res) => {
  res.render("appointment");
});

app.post("/data", (req, res) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let phone = req.body.phone;
  let date = req.body.date;
  let time = req.body.time;
  let message = req.body.message;

  let data = {
    name: fname,
    lname: lname,
    phone: phone,
    mobile: date,
    time: time,
    message: message,
  };

  db.collection("apoint").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.render("index");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/adddoctor", (req, res) => {
  res.render("adddoctor");
});

app.listen(port, () => console.info("Project Started......"));

var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
// Connecting to mongodb DataBase
mongoose
  .connect("mongodb://localhost:27017/newblog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Importing Routes
var usersRouter = require("./routes/user.route");
var postRouter = require("./routes/post.route");

// creating express instance
var app = express();

// setting up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// setting up main routes
app.use("/users", usersRouter);
app.use("/posts", postRouter);

app.get("/*", (req, res) => res.render("index"));

app.listen(process.env.PORT || 5000);

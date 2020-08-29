var express = require("express");
var user_controller = require("../controllers/user.controller");
var jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  //   console.log("AT --> ", req.body);
  const token = req.cookies["awtToken"];
  if (!token) {
    next();
  } else {
    jwt.verify(token, "SECRET_KEY", (err, data) => {
      if (err) return res.status(403).send({ msg: "Unauthorized Access" });
      req.user = data.name;
      next();
    });
  }
};

const router = express.Router();

router.post("/createuser", authenticateToken, user_controller.createUser);

router.post("/login", authenticateToken, user_controller.login);

router.get("/loginpage", authenticateToken, user_controller.loginPage);

router.get("/signpage", authenticateToken, user_controller.signPage);

router.get("/logout", authenticateToken, user_controller.logout);

module.exports = router;

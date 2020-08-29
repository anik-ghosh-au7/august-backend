var express = require("express");
var post_controller = require("../controllers/post.controller");
var jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
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

router.get("/postspage", authenticateToken, post_controller.showPosts);
router.post("/createpost", authenticateToken, post_controller.createPost);
router.post("/addcomment", authenticateToken, post_controller.addComment);
router.post("/deletepost", authenticateToken, post_controller.deletePost);

module.exports = router;

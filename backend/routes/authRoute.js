const express = require('express');
const router = express.Router();

const {registerUser,loginUser,getUser} = require("../controllers/authController")
const {Protect} = require("../middleware/authMiddleware")
const {admin}= require('../middleware/adminMiddleware')

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", Protect,admin, getUser);


module.exports = router;

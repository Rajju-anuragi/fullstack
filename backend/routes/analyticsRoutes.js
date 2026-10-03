const express = require('express');
const router = express.Router();

const {Protect} = require("../middleware/authMiddleware");
const {admin}= require('../middleware/adminMiddleware');
const {getAdminStats} = require("../controllers/analyticsController");


router.get("/",Protect,admin ,getAdminStats);
module.exports =router;
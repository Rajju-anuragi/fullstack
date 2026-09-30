const express=require("express");
const router =express.router();
const {createdOrder,verifyPayment}=require("../controllers/paymentController");
router.post("/order",createdOrder);

router.post("/verify",verifyPayment);
module.exports=Router;
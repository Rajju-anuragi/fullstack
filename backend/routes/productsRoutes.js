const express = require('express');
const {Protect} = require("../middleware/authMiddleware")
const {admin}= require('../middleware/adminMiddleware')
const {getProducts, getProductsById, createProducts, updateProducts, deleteProducts} = require('../controllers/productsController');
const multer = require('multer');
const upload = multer({dest:'upload/'});

const router = express.Router();

//all products
router.route('/').get(getProducts).post(Protect,admin,upload.single('image'), createProducts);
//Specific products
router.route('/:id').get(getProductsById).put(Protect,admin, upload.single('image') ,updateProducts).delete(Protect, admin, deleteProducts);


// CRUD OPERATION
// CREATE -POST
// READ - GET
// UPDATE -UPDATE
// DELETE - DELETE


module.exports = router;

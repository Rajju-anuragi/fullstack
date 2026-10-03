const express =require('express');
const {Protect} = require('../middleware/authMiddleware');
const {admin} = require('../middleware/adminMiddleware')
const {createOrder,updateOrderStatus,getOrder, myorders} = require('../controllers/OrderControllers')

const router = express.Router();

router.route('/').post(Protect,createOrder).get(Protect,admin,getOrder);
router.route('/myorders').get(Protect,myorders);
router.route('/:id/status').put(Protect,admin,updateOrderStatus);


module.exports = router;

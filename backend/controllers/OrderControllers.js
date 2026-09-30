
const Order = require('../model/orders');
const sendEmail = require('../utils/sendEmail');



//create new order
const createOrder = async (req, res) => {

    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });
        }
        else {
            const newOrder = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });
            await newOrder.save();
            const message = `Dear ${req.user.firstName},\n\n Thank you for your order !.Your order has been successfully  created with the following details\n\n order Id:${newOrder._id} \n Total amount${totalAmount} \n shipping address:${address}\n\n
            We will notify you once your order is shippped .\n\nBest regards,\nShopNow Team`
            await sendEmail(req.user.email, 'Order created', message);
            res.status(201).json({ message: ' Order created successfully',newOrder});


        }
    } catch (error) {
        console.error("Error in createOrder:",error );
        res.status(500).json({ message: 'Error creating order', error:error.message });

    }
};
 // get all order
const myorders = async (req, res) => {
    try {
        const userOrders = await Order.find({ user: req.user._id })
            .populate('user', 'firstName email')
            .populate('items.product', 'firstName price');
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};
//get single order
const getOrder =async (req,res)=>{
try {
        const userOrders = await Order.find({ user: req.user._id })
            .populate('user', 'id firstName')
            
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }

};

//update order status(admin)
const updateOrderStatus =async (req,res)=>{
    try {
        const{status} = req.body;
        const order = await Order.findById(req.params.id);
        if(order){
            order.status=status;
            await order.save();
            res.json({message:'Order Status updated',order});

        }
        else{
            res.status(404).json({message:'Order not found'});
        }
    } catch (error) {
        return res.status(500).json({message:'Error updating order status',error:error.message});        
    }
}
module.exports = {
    createOrder,
    myorders,
    getOrder,
    updateOrderStatus
};

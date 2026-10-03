const Order = require('../model/orders');
const User = require('../model/user');
const Product = require('../model/products');

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalOrders = await Order.countDocuments({});
        const totalProducts = await Product.countDocuments({});
        const orders = await Order.find({});
        const totalRevenueData = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue: totalRevenueData
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching status', error });
    }
};

module.exports = { getAdminStats };
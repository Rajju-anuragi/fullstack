const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("shopNow work efficiently");
});

// // user routes 
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/products', require('./routes/productsRoutes.js'));
// app.use('/api/cart',require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/ordersRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics',require('./routes/anlyticsRoutes'));



const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`shopNow app listen on port on ${PORT}`);
});
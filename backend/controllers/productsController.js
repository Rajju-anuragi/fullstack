const Product = require('../model/products');
const CLOUDINARY = require('../config/CLOUDINARY');


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'server error' });
    }
};

// GET BY ID ALL PRODUCT
const getProductsById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'server error' });
    }
};

// CREATE PRODUCT
const createProducts = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let imageUrl = '';

        if (req.file) {
            const result = await CLOUDINARY.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
};


//UPDAE PRODUCTS
const updateProducts = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;
        }
        else {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (req.file) {
            const result = await CLOUDINARY.uploader.upload(req.file.path);
            product.imageUrl = result.secure_url;
        }

        const updatedProduct = await product.save();
        return res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
};

//DELETE PRODUCT
const deleteProducts = async (req, res) => {
    try {
        console.log("Received ID:", req.params.id);
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {

            res.json({ message: 'Product Removed' });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'server error' });
    }
};



module.exports = { getProducts, getProductsById, createProducts, updateProducts, deleteProducts };

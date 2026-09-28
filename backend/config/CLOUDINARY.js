const CLOUDINARY = require('CLOUDINARY').v2;
require('dotenv').config();
CLOUDINARY.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = CLOUDINARY;
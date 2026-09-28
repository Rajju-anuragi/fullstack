// import mongoose from "mongoose";    
const mongoose = require("mongoose");
const { type } = require("node:os");
const { stringify } = require("node:querystring");
// const { hash } = require("node:crypto");

const userSchema = new mongoose.Schema(
    {

        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['user', 'admin'],
            default: 'user'
        },
        verified: {
            type: Boolean,
            default: false
        },
        otp: {
            type: String,
        },
        otpExpires: {
            type: Date,
        }
    },
    {
        timestamps: true
    });
const User = mongoose.model("User", userSchema)
module.exports = User;
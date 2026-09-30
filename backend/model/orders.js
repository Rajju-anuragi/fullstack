const mongoose = require('mongoose');
// const { stripTypeScriptTypes } = require('node:module');
// const { type } = require('node:os');
module.exports = mongoose.model("Order", new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: {
                type: Number, required: true
            }
        }
    ],
    totalAmount: { type: Number, required: true },
    address: {
        fullName: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pinCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },

    paymentId: {
        type: String,
        required: true
    },
    status:{
        type:String,
        enum:['pending','shipped','delivered'],default:'pending'
    }

    // name: {
    //     type: String,
    //     required: true
    // },
    // decription: {
    //     type: String,
    //     required: true
    // },
    // address: {
    //     type: String,
    //     required: true
    // },
    // pincode: {
    //     type: Number,
    //     required: true
    // },
    // mobile: {
    //     type: Number,
    //     required: true
    // },

    // price: {
    //     type: Number,
    //     required: true
    // },

    // payment: {
    //     type: String,
    //     required: true
    // },

}, {
    timestamps: true
}));
// module.exports = mongoose.model("Order", orderSchema)
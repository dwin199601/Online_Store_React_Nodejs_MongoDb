const mongoose = require('mongoose');

const Purchase = new mongoose.Schema({
    recipientName: {
        type: String,
        required: true
    },
    recipientId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemImage: {
        type: String
    },
    itemId: {
        type: String
    },
    paidAmount: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    suite: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    data_added: {
        type: Date,
        default: Date.now
    }
});

const PurchaseModel = mongoose.model("Purchase", Purchase);
module.exports = PurchaseModel;
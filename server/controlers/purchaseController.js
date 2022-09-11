const purchaseModel = require('../models/Purchase');
const mongoose = require('mongoose');


module.exports.createPurchase = (req, res) => {
    try {
        const {recipientName, recipientId, itemName, itemImage, itemId, paidAmount, street, suite, city, state, country, postalCode } = req.body;
        const purchase = new purchaseModel({
            recipientName: recipientName,
            recipientId: recipientId,
            itemName: itemName,
            itemImage: itemImage,
            itemId: itemId,
            paidAmount: paidAmount,
            street: street,
            suite: suite,
            city: city,
            state: state,
            country: country,
            postalCode: postalCode
        });
        purchase.save((err)=> {
            if(err){
                console.log(err);
                res.send(err);
            }
            else {
                console.log("New purchase was added");
                res.send(purchase);
            }
        })
    }
    catch(error) {
        console.log(error);
    }
}

module.exports.getPurchase = (req, res) => {
    try {
        purchaseModel.find((err, purchase) => {
            if(err) {
                console.log(err);
            }
            else {
                res.send(purchase);
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}
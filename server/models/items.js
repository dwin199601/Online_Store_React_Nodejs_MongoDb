const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_image: {
        type: [String]
    },
    item_name: {
            type: String,
            required: [true, "Item name is required!!"]
    },
    item_description: {
         type: String,
         required: [true, "Item description is required!!"]
    },
    price: {
        type: Number,
        min: 1,
        required: [true, "Item price must is required and must be more > 0"]
    },
    category: {
        type: String,
        required: [true, "Enter item category!"]
    },
    user_id: {
        type: String
    },
    data_added: {
        type: Date,
        default: Date.now
    }

});

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;
 // it allows us to use this model inside of other documents
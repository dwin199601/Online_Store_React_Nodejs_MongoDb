const Item = require("../models/items");
const mongoose = require('mongoose');

module.exports.getItemData = (req, res) => {
    try{
        Item.find((err, items)=>{
        if(err) 
        {   console.log(err)
            alert(err);
        }
        else 
        {
            console.log(items);
            res.send(items);
        }
        
    })
    }
    catch(error){
        console.log(error);
    }
}

module.exports.getItemById = async (req, res) => {
    try{
        let _id = req.params.id;
        const item = await Item.findById(_id);
        // console.log(item); 
        console.log(item);
        res.send(item);   
    } catch(error){
        console.log(error);
    }
}

module.exports.createItem = (req, res) => {
    try{
        const {item_image, item_name, item_description, price} = req.body;
        const items = new Item({
            item_image: item_image,
            item_name: item_name,
            item_description: item_description,
            price: price
        });
        items.save((err)=>{
           if(err){
               console.log(err);
               res.send(err);
           }
           else{
                console.log("The new item is inserted successfully");
                res.send(items);
           }
       });
    }
    catch(error){
        console.log(error);
    }
}

module.exports.updateItem = (req, res) => {
    try{
        let _id = req.params.id;
        _id = mongoose.Types.ObjectId(_id);
         console.log(_id);
         const {item_image, item_name, item_description, price} = req.body;

         Item.updateOne(
             {
                 _id: _id
             },
             {
                item_image: item_image,
                item_name: item_name,
                item_description: item_description,
                price: price

             }, (err)=>{
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else {
                    console.log("The item was updated successfully!");
                    res.send("The item was updated successfully!");
                }
             });
       }
       catch(error){
           console.log(error);
       }
}

module.exports.deleteItem = (req, res) => {
    try{
        let _id = req.params.id;
        _id = mongoose.Types.ObjectId(_id);
         console.log(_id);
         Item.deleteOne(
             { _id: _id},
              (err)=>{
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else {
                    console.log("The item was deleted successfully!");
                    res.send("The item was deleted successfully!");
                }
             });
       }
       catch(error){
           console.log(error);
       }
}
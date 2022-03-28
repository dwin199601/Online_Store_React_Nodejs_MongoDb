const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const ItemModel = require('./models/items.js');

//importing module from the items.js file

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.get("/", (req, res)=>{
    res.send("Check");
});

const url =
 "mongodb+srv://Alex:Alex@cluster0.gbjfl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

 mongoose.connect(url)
 .then(()=> console.log("Database is connected"))
 .catch((err)=> console.log(err));


//Reading Data
app.get('/api/items', (req, res)=>{
    try{
        ItemModel.find((err, items)=>{
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
})

//Reading data based on item ID
app.get('/api/items/:id', async (req, res)=>{
    try{
        let _id = req.params.id;
        // _id = mongoose.Types.ObjectId(_id);
        // console.log(_id);
        // ItemModel.findOne(_id);
        const item = await ItemModel.findById(_id);
        // console.log(item); 
        console.log(item);
        res.send(item);   
    } catch(error){
        console.log(error);
    }
})

//Creating Data

app.post("/api/newitems", (req,res)=>{
    try{
      
        const {item_image, item_name, item_description, price} = req.body;
        //console.log(item_image, item_name, item_description, price);
        const items = new ItemModel({
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
})


//UPDATE DATA
app.put("/api/items/:id", (req,res)=>{
    try{
        let _id = req.params.id;
        _id = mongoose.Types.ObjectId(_id);
         console.log(_id);
         const {item_image, item_name, item_description, price} = req.body;

         ItemModel.updateOne(
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
    })


     //delete data
     app.delete("/api/items/:id", (req,res)=>{
        try{
            let _id = req.params.id;
            _id = mongoose.Types.ObjectId(_id);
             console.log(_id);
             ItemModel.deleteOne(
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
        })



const port = (process.env.PORT) || 5000;
app.listen(port, ()=>{
    console.log("The server is up on port " + port);
})

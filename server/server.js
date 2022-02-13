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


//Reading Data
app.get('/api/items', async (req, res)=>{
    try{
        await mongoose.connect(url);
        console.log("Database is connected");
        ItemModel.find((err, items)=>{
        if(err) 
        {   console.log(err)
            alert(err);
        }
        else 
        {
            console.log(items);
            res.send(items);
            mongoose.connection.close();
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

        await mongoose.connect(url);
        console.log("Database is connected");
        // ItemModel.findOne(_id);
        const item = await ItemModel.findById(_id);
        // console.log(item);
        
        console.log(item);
        res.send(item);
        mongoose.connection.close();
        
        
    } catch(error){
        console.log(error);
    }
})

//Creating Data

app.post("/api/newitems", async (req,res)=>{
    try{
      
        const {item_image, item_name, item_description, price} = req.body;
        console.log(item_image, item_name, item_description, price);
        const items = new ItemModel({
            item_image: item_image,
            item_name: item_name,
            item_description: item_description,
            price: price
        });

        await mongoose.connect(url);
        console.log("Database connected");
        items.save((err)=>{
           if(err){
               console.log(err);
               res.send(err);
           }
           else{
                console.log("The new item is inserted successfully");
                res.send(items);
                mongoose.connection.close();
           }
       });
    }
    catch(error){
        console.log(error);
    }
})


//UPDATE DATA
app.put("/api/items/:id", async (req,res)=>{
    try{
        let _id = req.params.id;
        _id = mongoose.Types.ObjectId(_id);
         console.log(_id);
         const {item_image, item_name, item_description, price} = req.body;

         await mongoose.connect(url); //await is used to tell function that first of all we need to get connection before going farther
         console.log("Database is connected");

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
                    mongoose.connection.close();
                }
             });
       }
       catch(error){
           console.log(error);
       }
    })


     //delete data
     app.delete("/api/items/:id", async (req,res)=>{
        try{
            let _id = req.params.id;
            _id = mongoose.Types.ObjectId(_id);
             console.log(_id);
            
             await mongoose.connect(url); //await is used to tell function that first of all we need to get connection before going farther
             console.log("Database is connected");

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
                        mongoose.connection.close();
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

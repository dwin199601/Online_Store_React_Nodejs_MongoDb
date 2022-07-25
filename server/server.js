const express = require('express');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const UserModel = require("./models/UserModel");
const commentRouter = require('./routes/commentRoutes');
const authRoutes = require("./routes/authRoutes");
const itemRouter = require("./routes/itemRoutes");
const connection = require("./dbconnection");
const paymentRouter = require("./routes/paymentRoutes");
const PORT = process.env.PORT || 5050;

connection();
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true
}));
app.use('/', authRoutes);
app.use('/', itemRouter);
app.use('/', commentRouter);
app.use(paymentRouter);

app.get('/', (req, res) => {
    try {
        UserModel.find((err, user)=> {
            if(err){
                console.log(err);
                alert(err);
            }
            else {
                console.log(user);
                res.send(user);
            }
        })
    }
    catch(err)
    {
        console.log(error);
    }
});

app.delete('/:id', (req, res)=> {
    try {
        let _id = req.params.id;
        _id = mongoose.Types.ObjectId(_id);
        console.log(_id);
        UserModel.deleteOne(
            {_id: _id},
            (err) => {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else {
                    console.log("The user was deleted");
                    res.send("The user was deleted");
                }
            }
        )
    }
    catch(error) {
        console.log(error);
    }
}); 

app.put('/:id', (req, res) => {
    try 
    {
        let _id = req.params.id;
        _id = mongoose.Types.ObjectId(_id);
        console.log(_id);
        const {firstName, lastName, image, comments} = req.body;
        UserModel.updateOne(
            {
                _id: _id
            },
            {
                firstName: firstName,
                lastName: lastName,
                image: image,
                comments: comments

            },
            (err) => {
               if(err){
                    console.log(err);
                    res.send(err);
               }
               else {
                console.log("User details were updated successfully");
                res.send("User details were updated successfully");
               }
            }
        )
    }
    catch(err)
    {
        console.log(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

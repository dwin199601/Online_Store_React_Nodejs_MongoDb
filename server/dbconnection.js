const mongoose = require("mongoose"); //Mongoose is an object document modeling (ODM) layer that sits on top of Node’s MongoDB driver
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    };
    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to DB successfully");
    }
    catch(error)
    {
        console.log(error);
        console.log("Cannot connect to DB!");
    }
}
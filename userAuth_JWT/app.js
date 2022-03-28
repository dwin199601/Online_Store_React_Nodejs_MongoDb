require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./dbconnection");
const userRoutes = require('./routes/signup');
const authRoutes = require('./routes/login');
const PORT = process.env.PORT || 8080;
const {User} = require('./models/users');

//for db connection
connection();
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Check user authentification");
});

//routes
app.use("/api/signup", userRoutes);
app.use("/api/login", authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
const Users = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.SECRETKEY, async (err, decodedToken)=> {
            if(err) {
                res.json({status: false});
                next();
            }
            else {
                const user = await Users.findById(decodedToken.id);
                if(user) res.json({status: true, user: user.email});
                else res.json({status: false});
                next();  
            }
        })
    }
    else {
        res.json({status: false});
        next();
    }
}
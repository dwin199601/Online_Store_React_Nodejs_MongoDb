const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const maxAge = 3*24*60*60;

const createToken = (id) => { //user id that is created by mongoDB
    return jwt.sign({id}, process.env.SECRETKEY, {
        expiresIn: maxAge,
    })
}

const handleErrors = (error) => {
    let errors = {firstName: "", lastName: "", email: "", password: ""};

    if (error.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
      }
     // incorrect email while login
     if(error.message === 'Incorrect Email!') {
        errors.email = 'Email is not registered!';
    }
    // incorrect password while login
    if(error.message === 'Incorrect Password!') {
        errors.password = 'Password is incorrect!';
    }

    if(error.message.includes("Users validation failed")) {
        Object.values(error.errors).forEach(({properties})=> {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports.signup = async(req, res, next) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const user = await User.create({firstName, lastName, email, password});
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge*1000,
        });
        res.status(201).json({user: user._id, created: true});
    }
    catch(err)  {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created: false});
    }
}

module.exports.login = async(req, res, next) => {
    try {
        const { email, password} = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge*1000,
        });
        res.status(200).json({user: user._id, created: true});
    }
    catch(err)  {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created: false});
    }
}

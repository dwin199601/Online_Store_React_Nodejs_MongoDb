const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail} = require("validator");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "First Name is required!"] },
	lastName: { type: String, required: [true, "Last Name is required!"] },
	email: { type: String, required: [true, "Email is required!"], unique: true, lowercase: true, validate: [isEmail, 'Please enter a valid email'] },
	password: { type: String, required: [true, "Password is required!"], minlength: [6, 'Minimum password length is 6 character'] },
	image: {type: String},
}, {timestamps: true});

userSchema.pre("save", async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
}); //before saving user data, do this

userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({email});
	if(user) {
		const auth = await bcrypt.compare(password, user.password); //compare password from the front end with DB
		if(auth){
			return user;
		}
		throw Error("Incorrect Password!");
	}
	throw Error("Incorrect Email!");
}

module.exports = mongoose.model("Users", userSchema);
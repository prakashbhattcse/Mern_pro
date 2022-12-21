const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens:[ {
        token: {
            type: String,
            required: true
        }
    }]
})


// Hashing the password
userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})


// generating token

userSchema.methods.generateAuthToken = async function () {
    try {
        let usertoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);   // token generated
 
        //storing data to upper schema database and the left side token is the schema tokens word not token one
        this.tokens = this.tokens.concat({ token: usertoken });
        await this.save();
        return usertoken;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);     // const User ka first letter hamesha capital hoga like yha U capital h

module.exports = User;
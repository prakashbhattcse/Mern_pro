const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


require('../db/conn')
const User = require('../model/userSchema');



router.get('/', (req, res) => {
    res.send("hello from router")
});


router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plzz fill all the fields" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: " Password did't match" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();
            res.status(201).json({ message: "user registerd successfully" });
        }

    } catch (err) {
        console.log(err);
    }



    // WITH PROMISES
    // const { name, email, phone, work, password, cpassword } = req.body;

    // if (!name || !email || !phone || !work || !password || !cpassword) {
    //     return res.status(422).json({ error: "Plzz fill all the fields" });
    // }

    // User.findOne({ email: email })
    //     .then((userExist) => {
    //         if (userExist) {
    //             return res.status(422).json({ error: "Email already Exist" });
    //         }

    //         const user = new User({ name, email, phone, work, password, cpassword });

    //         user.save().then(() => {
    //             res.status(201).json({ message: "user registerd successfully" });
    //         }).catch((err) => res.status(500).json({ error: `Failed to register${err}` }));
    //     }).catch(err => { console.log(err); });
});


router.post('/signin', async (req, res) => {
    // res.json({ message: "awesome" })          // with this command i can display data in postman

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(422).json({ error: "please fill all details" });
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);


        if (userLogin) {

            const isMatch = await bcrypt.compare(password, userLogin.password);         //to compare hash password with user enter password during signin

            // console.log(token);
            if (isMatch) {
                res.json({ message: "user logged in succesfully" })
                const token = await userLogin.generateAuthToken();

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25982000000),
                    httpOnly: true
                })
            } else {
                res.status(400).json({ error: "Invalid data" });
            }
        } else {
            res.status(400).json({ error: "Invalid data" });
        }

    } catch (err) {
        console.log(err);
    }

})





module.exports = router;
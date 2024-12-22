const express = require("express");
const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const scheduleMeeting = require("../models/scheduleMeeting");

const userRegister = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!username) {
            return res.send({ status: false, message: "Please Enter UserName" });
        }
        if (!email.match(validRegex)) {
            return res.send({ status: false, message: "Please Enter valid Email" });
        }
        if (!password) {
            return res.send({ status: false, message: "Please Enter Valid Password" });
        }


        const userExists = await User.findOne({ email })
        console.log(userExists)
        if (userExists) {
            return res.send({ status: false, message: "Email Already Existing" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        await newUser.save();
        res.send({ status: true, message: "success" })


    } catch (error) {
        console.error("error ....", error.message)

    }

}
const userLogin = async (req, res) => {
    const { email, password } = req.body
    //console.log(req.body)
    if (!email) {
        return res.send({ status: false, message: "Please Enter valid Email" });
    }
    if (!password) {
        return res.send({ status: false, message: "Please Enter valid Password" });
    }

    const user = await User.findOne({ email });
    console.log("user Login", user)
    if (!user) {
        return res.send({ status: false, message: "Invalid Email or Password" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.send({ status: false, message: "Invalid Email or Password" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY)
    await res.cookie("token", token)

    res.send({ status: true, message: "User Login Successfully", token: token, user: user })

}
const ScheduleMeeting = async (req, res) => {
    const { details, authorId } = req.body;
    const { title, date, time } = details

    try {
        if (!title) {
            return res.send({ status: false, message: "Please Enter Description" });
        }
        if (!date) {
            return res.send({ status: false, message: "Please Select Date" });
        }
        if (!time) {
            return res.send({ status: false, message: "Please Select Time" });
        }

        const UserScheduleMeeting = new scheduleMeeting({
            title,
            date,
            time,
            author: authorId,
        });
        console.log("userScheduleMeeting", UserScheduleMeeting)

        await UserScheduleMeeting.save();

        res.send({ status: true, message: "Meeting Scheduled Successfully" });
    } catch (error) {
        console.error("Schedule meeting error:", error);
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};

const getScheduleMeeting = async (req, res) => {
    const { id } = req.params;

    try {

        if (!id) {
            return res.send({ status: false, message: "Id must required" })
        }
        const meeting = await scheduleMeeting.find({ author: id })


        res.send({ status: true, message: "success", result: meeting })

    } catch (error) {
        console.log("error.....", error)

    }





}


module.exports = { userRegister, userLogin, ScheduleMeeting, getScheduleMeeting }
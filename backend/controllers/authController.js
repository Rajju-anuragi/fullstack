const Jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");



//token genrator

const generateToken = (id) => {
    return Jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' });


};


//register a new user
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: 'user already exist' });
        }

        // TODOS
        // hash the password before saving to the database
        // implement JWT token generation for authentifiaction 
        // otp sending for verification for email confirmation implement with Codex
        // welcome email




        //  hash password

        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(password, salt);

        // generate otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        //CREATE USER
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            otp,
            otpExpires,
        });

        if (user) {
            // email message
            const message = `Welcome to ShopNow, ${firstName}! Thankyou for registering with us. We are exicited to have you as
            part of our community.to complete your registration,please use the following one time password (otp):Your OTP 
            for shopNow regidtration is :${otp}`;


            // send email  
            try {
                await sendEmail(email, 'welcome to shopnow - Your OTP for registration', message);
            } catch (emailError) {
                console.log("Email send karne me error aayi:", emailError.message);
            }
            
            return res.status(201).json({
                message: "User registerd successfully",
                _id: user._id,
                FirstName: user.firstName,
                LastName: user.lastName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
            //     }
            //     else {
            //         res.status(4).json({ "invailed data"});
            //     }
            // }
        }
    }

    catch (error) {
        return res.status(500).json({ message: "server error", error: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if
            (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)

            });
        } else {
            res.status(400).json({ message: 'invalid email or password' });
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//GET ALL USER
const getUser = async (req, res) => {
    try {
        const user = await User.find({}).select('-password');
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
};
module.exports = {
    registerUser,
    loginUser,
    getUser,
};
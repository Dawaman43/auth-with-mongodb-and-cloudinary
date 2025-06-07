require('dotenv').config()
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerUser = async(req,res)=>{
    try {
        const {username, email, password, role} = req.body;
        
        const checkUsernameAndEmail = await User.findOne({$or: [{username} ,{email}]});
        if(checkUsernameAndEmail){
            return res.status(400).json({
                success: false,
                message: 'A user already exists with the given password or email'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const registerNewUser = new User({
            username,
            email,
            password: hashPassword,
            role : role||'user'
        })

        await registerNewUser.save();
        if(registerNewUser){
            res.status(201).json({
                success: true,
                message: 'User registration successfull'
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'User registration failed. Please try again'
            })
        }
    } catch (error) {
        console.log("error->",error);
        res.status(400).json({
            success : false,
            message: 'User registraion failed. Try again'
        })
    }
}

const loginUser = async(req,res)=>{
    try {
        const {username, password} = req.body;

        const findUsername = await User.findOne({username});

        if(!findUsername){
            return  res.status(400).json({
            success : false,
            message: 'A user with given username is not found'
        })
        }

        const findPassword = await bcrypt.compare(password, findUsername.password);

        if(!findPassword){
            return  res.status(400).json({
            success : false,
            message: 'Invalid credentials. Please try again'
            })
        }

        const accessToken = jwt.sign({
            userId: findUsername._id,
            username: findUsername.username,
            role: findUsername.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15m'
        })

        res.status(200).json({
            success: true,
            message: 'Login successful',
            accessToken
        })
    } catch (error) {
        console.log("error->",error);
        res.status(400).json({
            success : false,
            message: 'User Login failed. Try again'
        }, )
    }
}

module.exports = {registerUser, loginUser}
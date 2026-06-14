const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        const isExist = await User.findOne({ email });

        if(isExist){
            return res.status(400).json({message: 'email is already use'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = User.create({
            name, email, password: hashed, role: role || 'customer'
        })

        const token = jwt.sign(
            {id: user._id, name: user.name, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '2d'}
        )

        res.status(201).json({
            message: 'User Register Successful',
            token
        })

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const login = async (req, res) => {
    try{

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: 'email is not registered'})
        }

        const isMatch = bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({message: 'invalid password'})
        }

        const token = jwt.sign(
            {
                id: user._id, name: user.name, email: user.email, role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d'}
        )

        res.status(200).json({
            message: 'login successful',
            token
        })
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    register, login
}
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )
}


export const registerUser = async (req, res) => {

    const {fullName, email, password, profileImageUrl} = req.body
    if (!fullName || !email || !password) {
        return res.status(400).json({message: "Missing required fields"})
    }

    try {
        const userExist = await User.findOne({email})
        if (userExist) {
            return res.status(409).json({message: "User already exist"})
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({message: "Error registering user", error: error.message})
    }
}


export const loginUser = async (req, res) => {

    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({message: "Email or Password missing"})
    }

    try {
        const user = await User.findOne({email})
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({message: "Error login in user", error: error.message})
    }
}


export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(401).json({message: "Unathorized, Please register/login"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Error getting user information", error: error.message})
    }
}
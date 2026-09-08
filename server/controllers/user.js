import User from "../models/User.js";

const postSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            name: username,
            email,
            password
        });

        const savedUser = await newUser.save();

        res.json({
            success: true,
            message: "User registered successfully",
            user: savedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const postLogin = (req, res) => {
    const { email, password } = req.body;

    res.json({
        success: true,
        message: "Login API working",
        email: email
    });
};

export { postSignup, postLogin };
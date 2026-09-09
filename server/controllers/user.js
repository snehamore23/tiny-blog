import User from "../models/User.js";

const postSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        console.log(name, email, password); // Log the request body for debugging

        const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameValidationRegex = /^[a-zA-Z]+$/;
        const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (emailValidationRegex.test(email) === false) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (nameValidationRegex.test(name) === false) {
            return res.status(400).json({
                success: false,
                message: "Name should contain only letters"
            });
        }

        if (passwordValidationRegex.test(password) === false) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        };

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: `User with email ${email} already exists`
            });
        }

        const newUser = new User({
            name,
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

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {
        const existingUser = await User.findOne({ email, password });
    if (existingUser) {
        return res.json({
            success: true,
            message: "User logged in successfully",
            user: existingUser,

        });
    }else{
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }
} catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
}
};

export { postSignup, postLogin };
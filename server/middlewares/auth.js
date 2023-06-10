// IMPORTS
const jwt = require("jsonwebtoken");

// auth
exports.auth = async (req, res, next) => {

    try {
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        //if token missing, return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing."
            });
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid."
            })
        }

        next();

    } catch (error) {
        console.log("Error Occured While Authenticating the token.");
        console.log(error),
            res.status(500).json({
                success: false,
                message: "Something went wrong while validating token."
            })
    }
}


// isStudent
exports.isStudent = async (req, res, next) => {
    try {

        //role is not student,return response
        if (req.user.accountType !== "student") {
            return res.status(400).json({
                success: false,
                message: "This is a protected route for Students only."
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified. Please try again."
        })
    }
}


// isInstructor
exports.isInstructor = async (req, res, next) => {
    try {

        //role is not instructor, return response
        if (req.user.accountType !== "instructor") {
            return res.status(400).json({
                success: false,
                message: "This is a protected route for Instructor only."
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Instructor role cannot be verified. Please try again."
        })
    }
}


// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {

        //role is not admin, return response
        if (req.user.accountType !== "admin") {
            return res.status(400).json({
                success: false,
                message: "This is a protected route for Admins only."
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Admin role cannot be verified. Please try again."
        })
    }
}
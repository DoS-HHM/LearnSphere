const jwt = require("jsonwebtoken");
require("dotenv").config();

const getToken = (req) => {
    const cookieToken = req.cookies?.token;
    if (cookieToken) return cookieToken;

    const bodyToken = req.body?.token;
    if (bodyToken) return bodyToken;

    const header = req.get("Authorization");
    if (header?.startsWith("Bearer ")) return header.slice(7);

    return null;
};

exports.auth = async (req, res, next) => {
    try {
        const token = getToken(req);
        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication token is missing" });
        }

        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Token is invalid or expired" });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

const requireRole = (role, label) => (req, res, next) => {
    if (req.user?.accountType !== role) {
        return res.status(403).json({
            success: false,
            message: `This is a protected route for ${label} only`,
        });
    }
    next();
};

exports.isStudent = requireRole("Student", "Students");
exports.isInstructor = requireRole("Instructor", "Instructors");
exports.isAdmin = requireRole("Admin", "Admins");

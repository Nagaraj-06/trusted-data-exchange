const authService = require("../../services/auth.service");
const response = require("../../utils/response");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
};

// POST /public/api/auth/register
exports.register = async (req, res, next) => {
    try {
        const { token, user } = await authService.register(req.body);
        res.cookie("token", token, cookieOptions);
        return response.created(res, { user }, "Registration successful");
    } catch (err) {
        next(err);
    }
};

// POST /public/api/auth/login
exports.login = async (req, res, next) => {
    try {
        const { token, user } = await authService.login(req.body);
        res.cookie("token", token, cookieOptions);
        return response.success(res, { user }, "Login successful");
    } catch (err) {
        next(err);
    }
};

// POST /public/api/auth/google
exports.googleLogin = async (req, res, next) => {
    try {
        const { token, user } = await authService.googleLogin(req.body.idToken);
        res.cookie("token", token, cookieOptions);
        return response.success(res, { user }, "Google login successful");
    } catch (err) {
        next(err);
    }
};

// POST /public/api/auth/logout
exports.logout = async (req, res, next) => {
    res.clearCookie("token");
    return response.success(res, null, "Logged out successfully");
};

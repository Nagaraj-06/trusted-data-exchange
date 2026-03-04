const usersService = require("../../services/users.service");
const response = require("../../utils/response");

// GET /private/api/users/me (Get own profile)
exports.getProfile = async (req, res, next) => {
    try {
        const data = await usersService.getProfile(req.user.id);
        return response.success(res, data);
    } catch (err) {
        next(err);
    }
};

// PATCH /private/api/users/me (Update own profile)
exports.updateProfile = async (req, res, next) => {
    try {
        const data = await usersService.updateProfile(req.user.id, req.body);
        return response.success(res, data, "Profile updated");
    } catch (err) {
        next(err);
    }
};

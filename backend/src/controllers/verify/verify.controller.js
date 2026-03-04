const verifyService = require("../../services/verify.service");
const response = require("../../utils/response");

// GET /public/api/verify/:token (Public — no login required)
exports.verifyRecord = async (req, res, next) => {
    try {
        const data = await verifyService.verifyByToken(req.params.token);
        return response.success(res, data, "Record verified");
    } catch (err) {
        next(err);
    }
};

const shareService = require("../../services/share.service");
const response = require("../../utils/response");

// POST /private/api/share (Student generates a shareable link)
exports.createShareLink = async (req, res, next) => {
    try {
        const data = await shareService.createShareLink(req.user, req.body);
        return response.created(res, data, "Share link created");
    } catch (err) {
        next(err);
    }
};

// GET /private/api/share (Student views their own active links)
exports.getMyShareLinks = async (req, res, next) => {
    try {
        const data = await shareService.getMyShareLinks(req.user);
        return response.success(res, data);
    } catch (err) {
        next(err);
    }
};

// DELETE /private/api/share/:id (Student revokes a link)
exports.revokeShareLink = async (req, res, next) => {
    try {
        const data = await shareService.revokeShareLink(req.user, req.params.id);
        return response.success(res, data, "Link revoked");
    } catch (err) {
        next(err);
    }
};

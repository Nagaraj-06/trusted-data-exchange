const adminService = require("../../services/admin.service");
const response = require("../../utils/response");

// GET /private/api/admin/institutions (List all institutions)
exports.getInstitutions = async (req, res, next) => {
    try {
        const data = await adminService.getInstitutions();
        return response.success(res, data);
    } catch (err) {
        next(err);
    }
};

// PATCH /private/api/admin/institutions/:id (Approve/Reject institution)
exports.updateInstitutionStatus = async (req, res, next) => {
    try {
        const data = await adminService.updateInstitutionStatus(
            parseInt(req.params.id),
            req.body.status
        );
        return response.success(res, data, "Institution status updated");
    } catch (err) {
        next(err);
    }
};

// GET /private/api/admin/stats (Dashboard stats)
exports.getStats = async (req, res, next) => {
    try {
        const data = await adminService.getStats();
        return response.success(res, data);
    } catch (err) {
        next(err);
    }
};

// GET /private/api/admin/audit-logs (Audit trail)
exports.getAuditLogs = async (req, res, next) => {
    try {
        const data = await adminService.getAuditLogs(req.query);
        return response.success(res, data);
    } catch (err) {
        next(err);
    }
};

// POST /private/api/admin/institutions
exports.createInstitution = async (req, res, next) => {
    try {
        const data = await adminService.createInstitution(req.body);
        return response.created(res, data, "Institution created");
    } catch (err) {
        next(err);
    }
};

// POST /private/api/admin/link-user
exports.linkUserToInstitution = async (req, res, next) => {
    try {
        const { userId, institutionId } = req.body;
        const data = await adminService.linkUserToInstitution(userId, institutionId);
        return response.success(res, data, "User linked to institution");
    } catch (err) {
        next(err);
    }
};

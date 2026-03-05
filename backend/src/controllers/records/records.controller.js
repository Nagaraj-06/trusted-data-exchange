const recordsService = require("../../services/records.service");
const response = require("../../utils/response");

// GET /private/api/records (Student: own records | Institution: issued records)
exports.getRecords = async (req, res, next) => {
    try {
        const data = await recordsService.getRecords(req.user);
        return response.success(res, data);
    } catch (err) {
        next(err);
    }
};

// POST /private/api/records (Institution Admin only)
exports.createRecord = async (req, res, next) => {
    try {
        const data = await recordsService.createRecord(req.user, req.body);
        return response.created(res, data, "Record created successfully");
    } catch (err) {
        next(err);
    }
};

// PATCH /private/api/records/:id/status (Institution Admin only)
exports.updateRecordStatus = async (req, res, next) => {
    try {
        const data = await recordsService.updateRecordStatus(
            req.user,
            parseInt(req.params.id),
            req.body.status
        );
        return response.success(res, data, "Record status updated");
    } catch (err) {
        next(err);
    }
};
// POST /private/api/records/bulk (Institution Admin only)
exports.bulkIssueRecords = async (req, res, next) => {
    try {
        const data = await recordsService.bulkCreateRecords(req.user, req.body.records);
        return response.created(res, data, `${data.length} records issued successfully`);
    } catch (err) {
        next(err);
    }
};

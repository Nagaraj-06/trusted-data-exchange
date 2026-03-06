const institutionService = require("../../services/institution.service");
const response = require("../../utils/response");

/**
 * POST /private/api/institutions/students/bulk
 * Bulk creates students for the authenticated institution
 */
exports.bulkCreateStudents = async (req, res, next) => {
    try {
        const { students } = req.body;

        if (!students || !Array.isArray(students)) {
            return response.badRequest(res, "Students data must be an array");
        }

        const data = await institutionService.bulkCreateStudents(req.user, students);

        return response.success(res, data, "Bulk student creation process completed");
    } catch (err) {
        next(err);
    }
};

/**
 * GET /private/api/institutions/students
 * Lists all students linked to the institution
 */
exports.getStudents = async (req, res, next) => {
    try {
        const data = await institutionService.getInstitutionStudents(req.user.institutionId);
        return response.success(res, data);
    } catch (err) {
        next(err);
    }
};

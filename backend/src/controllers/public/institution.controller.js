const adminService = require("../../services/admin.service");
const response = require("../../utils/response");
const bcrypt = require("bcrypt");

// POST /public/api/institutions/register
exports.registerInstitution = async (req, res, next) => {
    try {
        const { name, accreditation, contactEmail, address, password } = req.body;
        const documentUrl = req.file ? `/uploads/verification/${req.file.filename}` : null;

        // Check for duplicate institution with same email
        const existingInst = await adminService.getInstitutionByEmail(contactEmail);
        if (existingInst && existingInst.status !== 'REJECTED') {
            return response.badRequest(res, "An application with this email already exists or is pending.");
        }

        // Hash password for temporary storage
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await adminService.registerInstitution({
            name,
            accreditation,
            contactEmail,
            address,
            documentUrl,
            password: hashedPassword,
            status: "PENDING"
        });

        return response.created(res, data, "Application submitted successfully. Please wait for admin approval.");
    } catch (err) {
        next(err);
    }
};

// GET /public/api/institutions/status/:email
exports.getApplicationStatus = async (req, res, next) => {
    try {
        const { email } = req.params;
        const institution = await adminService.getInstitutionByEmail(email);

        if (!institution) {
            return response.notFound(res, "No application found for this email address");
        }

        return response.success(res, {
            name: institution.name,
            status: institution.status,
            createdAt: institution.createdAt
        });
    } catch (err) {
        next(err);
    }
};

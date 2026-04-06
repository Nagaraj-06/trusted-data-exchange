const { prisma } = require("../config/db");
const bcrypt = require("bcrypt");

// Get all institutions
async function getInstitutions() {
    return prisma.institution.findMany({
        include: { _count: { select: { records: true, admins: true } } },
        orderBy: { createdAt: "desc" },
    });
}

// Approve or reject an institution
async function updateInstitutionStatus(institutionId, status) {
    const institution = await prisma.institution.findUnique({
        where: { id: institutionId }
    });

    if (status === "APPROVED" && institution && institution.status !== "APPROVED") {
        // Automatically create a user for this institution
        const existingUser = await prisma.user.findUnique({
            where: { email: institution.contactEmail }
        });

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    email: institution.contactEmail,
                    password: institution.password, // This is already hashed from registerInstitution
                    name: institution.name,
                    role: "INSTITUTION",
                    institutionId: institutionId
                }
            });
        }
    }

    return prisma.institution.update({
        where: { id: institutionId },
        data: { status },
    });
}

// Dashboard stats
async function getStats() {
    const [totalInstitutions, totalStudents, totalRecords, pendingApprovals] =
        await Promise.all([
            prisma.institution.count({ where: { status: "APPROVED" } }),
            prisma.user.count({ where: { role: "STUDENT" } }),
            prisma.academicRecord.count(),
            prisma.institution.count({ where: { status: "PENDING" } }),
        ]);

    return { totalInstitutions, totalStudents, totalRecords, pendingApprovals };
}

// Create a new institution (Admin direct)
async function createInstitution(data) {
    return prisma.institution.create({
        data: {
            name: data.name,
            accreditation: data.accreditation,
            contactEmail: data.contactEmail,
            address: data.address,
            status: "APPROVED",
        },
    });
}

// Public registration (Pending)
async function registerInstitution(data) {
    const institution = await prisma.institution.create({
        data: {
            name: data.name,
            accreditation: data.accreditation,
            contactEmail: data.contactEmail,
            address: data.address,
            documentUrl: data.documentUrl,
            password: data.password,
            status: "PENDING",
        },
    });

    // Log the application in the audit trail
    await prisma.auditLog.create({
        data: {
            action: "INSTITUTION_APPLICATION_SUBMITTED",
            userEmail: data.contactEmail,
            resource: `Institution registration: ${data.name}`,
            ipAddress: data.ipAddress || null,
        },
    });

    return institution;
}

// Link a user to an institution
async function linkUserToInstitution(userId, institutionId) {
    return prisma.user.update({
        where: { id: parseInt(userId) },
        data: { institutionId: parseInt(institutionId), role: "INSTITUTION" },
    });
}

// Get institution by email for status check
async function getInstitutionByEmail(email) {
    return prisma.institution.findFirst({
        where: { contactEmail: email },
        orderBy: { createdAt: "desc" },
    });
}

// Get audit logs with optional filters
async function getAuditLogs(query = {}) {
    const { page = 1, limit = 20 } = query;

    const logs = await prisma.auditLog.findMany({
        orderBy: { timestamp: "desc" },
        skip: (page - 1) * limit,
        take: parseInt(limit),
    });

    const total = await prisma.auditLog.count();

    return { logs, total, page: parseInt(page), limit: parseInt(limit) };
}

module.exports = {
    getInstitutions,
    updateInstitutionStatus,
    getStats,
    getAuditLogs,
    createInstitution,
    registerInstitution,
    getInstitutionByEmail,
    linkUserToInstitution
};

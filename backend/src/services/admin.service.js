const { prisma } = require("../config/db");

// Get all institutions
async function getInstitutions() {
    return prisma.institution.findMany({
        include: { _count: { select: { records: true, admins: true } } },
        orderBy: { createdAt: "desc" },
    });
}

// Approve or reject an institution
async function updateInstitutionStatus(institutionId, status) {
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

// Create a new institution
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

// Link a user to an institution
async function linkUserToInstitution(userId, institutionId) {
    return prisma.user.update({
        where: { id: parseInt(userId) },
        data: { institutionId: parseInt(institutionId), role: "INSTITUTION" },
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
    linkUserToInstitution
};

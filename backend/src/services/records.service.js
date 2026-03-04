const { prisma } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Get records based on user role
async function getRecords(user) {
    if (user.role === "STUDENT") {
        return prisma.academicRecord.findMany({
            where: { studentId: user.id },
            include: { institution: { select: { name: true } } },
            orderBy: { createdAt: "desc" },
        });
    }

    if (user.role === "INSTITUTION") {
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        return prisma.academicRecord.findMany({
            where: { institutionId: dbUser.institutionId },
            include: { student: { select: { name: true, email: true } } },
            orderBy: { createdAt: "desc" },
        });
    }

    // ADMIN can see all
    return prisma.academicRecord.findMany({
        include: {
            student: { select: { name: true, email: true } },
            institution: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
    });
}

// Create a new academic record (Institution only)
async function createRecord(user, data) {
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

    if (!dbUser.institutionId) {
        const err = new Error("You are not authorized to issue records. Your account is not yet linked to an institution.");
        err.statusCode = 403;
        throw err;
    }

    const record = await prisma.academicRecord.create({
        data: {
            student: { connect: { id: parseInt(data.studentId) } },
            institution: { connect: { id: dbUser.institutionId } },
            degree: data.degree,
            program: data.program,
            issueDate: data.issueDate ? new Date(data.issueDate) : new Date(),
            graduationYear: data.graduationYear ? parseInt(data.graduationYear) : null,
            grade: data.grade,
            status: "PENDING",
            refCode: `REF-${uuidv4().slice(0, 8).toUpperCase()}`,
        },
    });

    return record;
}

// Update record status (Institution only)
async function updateRecordStatus(user, recordId, status) {
    const record = await prisma.academicRecord.update({
        where: { id: recordId },
        data: { status },
    });
    return record;
}

module.exports = { getRecords, createRecord, updateRecordStatus };

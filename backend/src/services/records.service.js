const { prisma } = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

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
            include: { student: { select: { name: true, email: true, rollNumber: true } } },
            orderBy: { createdAt: "desc" },
        });
    }

    // ADMIN can see all
    return prisma.academicRecord.findMany({
        include: {
            student: { select: { name: true, email: true, rollNumber: true } },
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

    // Find student by rollNumber or create a placeholder if it doesn't exist
    let student = await prisma.user.findUnique({
        where: { rollNumber: String(data.studentRollNumber) }
    });

    if (!student) {
        // Create placeholder student if they don't exist
        const placeholderPassword = await bcrypt.hash(`Welcome@${data.studentRollNumber}`, 10);
        student = await prisma.user.create({
            data: {
                rollNumber: String(data.studentRollNumber),
                name: `Student ${data.studentRollNumber}`,
                email: `student.${data.studentRollNumber}@placeholder.edu`, // Placeholder email
                password: placeholderPassword,
                role: "STUDENT"
            }
        });
    }

    const record = await prisma.academicRecord.create({
        data: {
            student: { connect: { id: student.id } },
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

// Bulk create academic records (Institution only)
async function bulkCreateRecords(user, recordsData) {
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

    if (!dbUser.institutionId) {
        const err = new Error("You are not authorized to issue records.");
        err.statusCode = 403;
        throw err;
    }

    const records = await Promise.all(recordsData.map(async (data) => {
        // Find student by rollNumber or create a placeholder
        let student = await prisma.user.findUnique({
            where: { rollNumber: String(data.studentRollNumber) }
        });

        if (!student) {
            const placeholderPassword = await bcrypt.hash(`Welcome@${data.studentRollNumber}`, 10);
            student = await prisma.user.create({
                data: {
                    rollNumber: String(data.studentRollNumber),
                    name: `Student ${data.studentRollNumber}`,
                    email: `student.${data.studentRollNumber}@placeholder.edu`,
                    password: placeholderPassword,
                    role: "STUDENT"
                }
            });
        }

        return prisma.academicRecord.create({
            data: {
                student: { connect: { id: student.id } },
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
    }));

    return records;
}

module.exports = { getRecords, createRecord, updateRecordStatus, bulkCreateRecords };

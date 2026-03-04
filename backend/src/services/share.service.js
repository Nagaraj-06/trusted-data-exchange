const { prisma } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Student creates a shareable link for a record
async function createShareLink(user, { recordId, expiresInHours = 24 }) {
    // Verify the record belongs to this student
    const record = await prisma.academicRecord.findFirst({
        where: { id: recordId, studentId: user.id },
    });

    if (!record) {
        const err = new Error("Record not found or access denied");
        err.statusCode = 404;
        throw err;
    }

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    const link = await prisma.sharedLink.create({
        data: { recordId, token, expiresAt },
    });

    return { token: link.token, expiresAt: link.expiresAt };
}

// Student views their own active share links
async function getMyShareLinks(user) {
    const records = await prisma.academicRecord.findMany({
        where: { studentId: user.id },
        select: { id: true },
    });

    const recordIds = records.map((r) => r.id);

    return prisma.sharedLink.findMany({
        where: { recordId: { in: recordIds }, isRevoked: false },
        include: { record: { select: { degree: true, refCode: true } } },
        orderBy: { createdAt: "desc" },
    });
}

// Student revokes a share link
async function revokeShareLink(user, linkId) {
    const link = await prisma.sharedLink.findUnique({
        where: { id: linkId },
        include: { record: true },
    });

    if (!link || link.record.studentId !== user.id) {
        const err = new Error("Link not found or access denied");
        err.statusCode = 404;
        throw err;
    }

    return prisma.sharedLink.update({
        where: { id: linkId },
        data: { isRevoked: true },
    });
}

module.exports = { createShareLink, getMyShareLinks, revokeShareLink };

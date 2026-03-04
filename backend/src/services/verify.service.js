const { prisma } = require("../config/db");

// Public: Verify a record by shared link token (NO login required)
async function verifyByToken(token) {
    const link = await prisma.sharedLink.findUnique({
        where: { token },
        include: {
            record: {
                include: {
                    student: { select: { name: true } },
                    institution: { select: { name: true, contactEmail: true, address: true } },
                },
            },
        },
    });

    if (!link) {
        const err = new Error("Verification link not found");
        err.statusCode = 404;
        throw err;
    }

    if (link.isRevoked) {
        const err = new Error("This verification link has been revoked");
        err.statusCode = 410;
        throw err;
    }

    if (new Date() > link.expiresAt) {
        const err = new Error("This verification link has expired");
        err.statusCode = 410;
        throw err;
    }

    return {
        verificationId: link.id,
        expiresAt: link.expiresAt,
        record: link.record,
    };
}

module.exports = { verifyByToken };

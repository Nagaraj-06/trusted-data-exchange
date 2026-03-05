const { prisma } = require("../config/db");

// Get user profile by ID
async function getProfile(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
            createdAt: true,
            institution: { select: { name: true, accreditation: true, contactEmail: true } },
        },
    });

    if (!user) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
    }

    return user;
}

// Update user profile
async function updateProfile(userId, data) {
    return prisma.user.update({
        where: { id: userId },
        data: { name: data.name, avatar: data.avatar },
        select: { id: true, name: true, email: true, role: true, avatar: true },
    });
}

module.exports = { getProfile, updateProfile };

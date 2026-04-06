const bcrypt = require("bcrypt");
const { prisma } = require("../config/db");
const { generateToken } = require("../utils/jwt");
const { verifyGoogleToken } = require("../utils/google");

// Register with email & password
async function register({ name, email, password, role }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        const err = new Error("Email already registered");
        err.statusCode = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, role: role || "STUDENT" },
    });

    const token = generateToken({ id: user.id, email: user.email, role: user.role, institutionId: user.institutionId });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, institutionId: user.institutionId } };
}

// Login with email & password
async function login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role, institutionId: user.institutionId });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, institutionId: user.institutionId } };
}

// Login / Register with Google OAuth
async function googleLogin(idToken) {
    const payload = await verifyGoogleToken(idToken);
    const { sub: googleId, email, name, picture } = payload;

    // First try to find by googleId
    let user = await prisma.user.findUnique({ where: { googleId } });

    if (!user) {
        // If googleId not found, try finding by email to link accounts
        user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            // Link Google identity to existing email account
            user = await prisma.user.update({
                where: { id: user.id },
                data: { googleId, avatar: user.avatar || picture },
            });
        } else {
            // First time Google login and no existing email — create new user
            user = await prisma.user.create({
                data: { email, name, googleId, avatar: picture, role: "STUDENT" },
            });
        }
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role, institutionId: user.institutionId });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, institutionId: user.institutionId } };
}

module.exports = { register, login, googleLogin };

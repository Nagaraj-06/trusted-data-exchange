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

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
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

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

// Login / Register with Google OAuth
async function googleLogin(idToken) {
    const payload = await verifyGoogleToken(idToken);
    const { sub: googleId, email, name, picture } = payload;

    let user = await prisma.user.findUnique({ where: { googleId } });

    if (!user) {
        // First time Google login — create new user
        user = await prisma.user.create({
            data: { email, name, googleId, avatar: picture, role: "STUDENT" },
        });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

module.exports = { register, login, googleLogin };

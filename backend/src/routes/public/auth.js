const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/auth.controller");

/**
 * @swagger
 * /public/api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nagaraj R"
 *               email:
 *                 type: string
 *                 example: "nagaraj@university.edu"
 *               password:
 *                 type: string
 *                 example: "SecurePass123"
 *               role:
 *                 type: string
 *                 enum: [STUDENT, INSTITUTION, ADMIN]
 *                 default: STUDENT
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *       409:
 *         description: Email already registered
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /public/api/auth/login:
 *   post:
 *     summary: Login with email & password
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "nagaraj@university.edu"
 *               password:
 *                 type: string
 *                 example: "SecurePass123"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       type: object
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /public/api/auth/google:
 *   post:
 *     summary: Login or register with Google OAuth
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idToken
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Google OAuth ID token from frontend
 *     responses:
 *       200:
 *         description: Google login successful
 *       401:
 *         description: Invalid Google token
 */
router.post("/google", authController.googleLogin);

/**
 * @swagger
 * /public/api/auth/logout:
 *   post:
 *     summary: Logout user (clears httpOnly cookie)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", authController.logout);

module.exports = router;

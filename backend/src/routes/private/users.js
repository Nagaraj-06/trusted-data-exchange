const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/users.controller");

/**
 * @swagger
 * /private/api/users/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: [STUDENT, INSTITUTION, ADMIN]
 *                     avatar:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     institution:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/me", usersController.getProfile);

/**
 * @swagger
 * /private/api/users/me:
 *   patch:
 *     summary: Update current user's profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nagaraj R"
 *               avatar:
 *                 type: string
 *                 example: "https://example.com/avatar.jpg"
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */
router.patch("/me", usersController.updateProfile);

module.exports = router;

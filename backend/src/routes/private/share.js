const express = require("express");
const router = express.Router();
const shareController = require("../../controllers/share/share.controller");
const authorize = require("../../middlewares/role.middleware");

/**
 * @swagger
 * /private/api/share:
 *   post:
 *     summary: Create a shareable verification link (Student only)
 *     description: Generates a unique, expiring public link for a specific academic record.
 *     tags: [Share]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recordId
 *             properties:
 *               recordId:
 *                 type: integer
 *                 description: The academic record to share
 *                 example: 1
 *               expiresInHours:
 *                 type: integer
 *                 description: Link expiry time in hours (default 24)
 *                 default: 24
 *                 example: 48
 *     responses:
 *       201:
 *         description: Share link created
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
 *                     token:
 *                       type: string
 *                       description: UUID token to be used in /verify/{token}
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *       403:
 *         description: Forbidden - Student role required
 *       404:
 *         description: Record not found or access denied
 */
router.post("/", authorize("STUDENT"), shareController.createShareLink);

/**
 * @swagger
 * /private/api/share:
 *   get:
 *     summary: Get my active share links (Student only)
 *     tags: [Share]
 *     responses:
 *       200:
 *         description: List of active share links
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       token:
 *                         type: string
 *                       expiresAt:
 *                         type: string
 *                         format: date-time
 *                       isRevoked:
 *                         type: boolean
 *                       record:
 *                         type: object
 *                         properties:
 *                           degree:
 *                             type: string
 *                           refCode:
 *                             type: string
 *       403:
 *         description: Forbidden - Student role required
 */
router.get("/", authorize("STUDENT"), shareController.getMyShareLinks);

/**
 * @swagger
 * /private/api/share/{id}:
 *   delete:
 *     summary: Revoke a share link (Student only)
 *     tags: [Share]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Share link ID (UUID)
 *     responses:
 *       200:
 *         description: Link revoked successfully
 *       403:
 *         description: Forbidden - Student role required
 *       404:
 *         description: Link not found or access denied
 */
router.delete("/:id", authorize("STUDENT"), shareController.revokeShareLink);

module.exports = router;

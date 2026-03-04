const express = require("express");
const router = express.Router();
const verifyController = require("../../controllers/verify/verify.controller");

/**
 * @swagger
 * /public/api/verify/{token}:
 *   get:
 *     summary: Verify an academic record via public link
 *     description: Anyone with the token can view the verified record. No login required.
 *     tags: [Verify]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique share link token (UUID)
 *         example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *     responses:
 *       200:
 *         description: Record verified successfully
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
 *                     verificationId:
 *                       type: string
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                     record:
 *                       type: object
 *                       properties:
 *                         degree:
 *                           type: string
 *                         program:
 *                           type: string
 *                         issueDate:
 *                           type: string
 *                         grade:
 *                           type: string
 *                         status:
 *                           type: string
 *                         student:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                         institution:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             contactEmail:
 *                               type: string
 *                             address:
 *                               type: string
 *       404:
 *         description: Verification link not found
 *       410:
 *         description: Verification link expired or revoked
 */
router.get("/:token", verifyController.verifyRecord);

module.exports = router;

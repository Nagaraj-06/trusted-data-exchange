const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/admin.controller");
const authorize = require("../../middlewares/role.middleware");

// All admin routes require ADMIN role
router.use(authorize("ADMIN"));

/**
 * @swagger
 * /private/api/admin/stats:
 *   get:
 *     summary: Get system dashboard statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: System stats
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
 *                     totalInstitutions:
 *                       type: integer
 *                       example: 1248
 *                     totalStudents:
 *                       type: integer
 *                       example: 4200000
 *                     totalRecords:
 *                       type: integer
 *                       example: 145000
 *                     pendingApprovals:
 *                       type: integer
 *                       example: 14
 *       403:
 *         description: Forbidden - Admin role required
 */
router.get("/stats", adminController.getStats);

/**
 * @swagger
 * /private/api/admin/institutions:
 *   get:
 *     summary: Get all institutions
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all institutions
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
 *                         type: integer
 *                       name:
 *                         type: string
 *                       accreditation:
 *                         type: string
 *                       contactEmail:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [PENDING, APPROVED, REJECTED]
 *       403:
 *         description: Forbidden - Admin role required
 *   post:
 *     summary: Create a new institution
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               accreditation:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Institution created
 */
router.get("/institutions", adminController.getInstitutions);
router.post("/institutions", adminController.createInstitution);

/**
 * @swagger
 * /private/api/admin/link-user:
 *   post:
 *     summary: Link a user to an institution
 *     description: Used to assign an institution ID to a user account (e.g., assigning an admin to a college).
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, institutionId]
 *             properties:
 *               userId:
 *                 type: integer
 *               institutionId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User linked successfully
 */
router.post("/link-user", adminController.linkUserToInstitution);

/**
 * @swagger
 * /private/api/admin/institutions/{id}:
 *   patch:
 *     summary: Approve or reject an institution
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Institution ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [APPROVED, REJECTED]
 *                 example: "APPROVED"
 *     responses:
 *       200:
 *         description: Institution status updated
 *       403:
 *         description: Forbidden - Admin role required
 */
router.patch("/institutions/:id", adminController.updateInstitutionStatus);

/**
 * @swagger
 * /private/api/admin/audit-logs:
 *   get:
 *     summary: Get system audit logs
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Results per page
 *     responses:
 *       200:
 *         description: Paginated audit logs
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
 *                     logs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           userEmail:
 *                             type: string
 *                           action:
 *                             type: string
 *                           resource:
 *                             type: string
 *                           ipAddress:
 *                             type: string
 *                           timestamp:
 *                             type: string
 *                             format: date-time
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       403:
 *         description: Forbidden - Admin role required
 */
router.get("/audit-logs", adminController.getAuditLogs);

module.exports = router;

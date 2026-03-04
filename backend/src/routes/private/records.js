const express = require("express");
const router = express.Router();
const recordsController = require("../../controllers/records/records.controller");
const authorize = require("../../middlewares/role.middleware");

/**
 * @swagger
 * /private/api/records:
 *   get:
 *     summary: Get academic records
 *     description: |
 *       Returns records based on user role:
 *       - **STUDENT**: Own records
 *       - **INSTITUTION**: Records issued by their institution
 *       - **ADMIN**: All records
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: List of academic records
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
 *                       degree:
 *                         type: string
 *                       program:
 *                         type: string
 *                       issueDate:
 *                         type: string
 *                         format: date-time
 *                       graduationYear:
 *                         type: integer
 *                       grade:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [PENDING, VERIFIED, REVOKED]
 *                       refCode:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/", recordsController.getRecords);

/**
 * @swagger
 * /private/api/records:
 *   post:
 *     summary: Create a new academic record (Institution only)
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - degree
 *             properties:
 *               studentId:
 *                 type: integer
 *                 description: ID of the student
 *                 example: 1
 *               degree:
 *                 type: string
 *                 example: "B.Sc. Computer Science"
 *               program:
 *                 type: string
 *                 example: "Computer Science & Engineering"
 *               issueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-15"
 *               graduationYear:
 *                 type: integer
 *                 example: 2024
 *               grade:
 *                 type: string
 *                 example: "First Class"
 *     responses:
 *       201:
 *         description: Record created successfully
 *       403:
 *         description: Forbidden - Institution role required
 */
router.post("/", authorize("INSTITUTION"), recordsController.createRecord);

/**
 * @swagger
 * /private/api/records/{id}/status:
 *   patch:
 *     summary: Update record status (Institution only)
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Record ID
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
 *                 enum: [PENDING, VERIFIED, REVOKED]
 *                 example: "VERIFIED"
 *     responses:
 *       200:
 *         description: Record status updated
 *       403:
 *         description: Forbidden - Institution role required
 */
router.patch("/:id/status", authorize("INSTITUTION"), recordsController.updateRecordStatus);

module.exports = router;

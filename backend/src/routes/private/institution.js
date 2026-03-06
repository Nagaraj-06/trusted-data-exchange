const express = require("express");
const router = express.Router();
const institutionController = require("../../controllers/institution/institution.controller");

/**
 * @swagger
 * /private/api/institutions/students/bulk:
 *   post:
 *     summary: Bulk onboard students (Institution only)
 *     description: |
 *       Creates student accounts in bulk. Each student requires:
 *       - **name**: Full name of the student
 *       - **email**: Unique email address
 *       - **batchYear**: Year of admission (e.g. 2023)
 *       - **deptCategory**: Either "CORE" or "NON-CORE"
 *       - **deptCode**: Department code (e.g. "CS", "IT", "ME")
 *
 *       Roll numbers are auto-generated in format: 7376YYCDTXXX
 *       Default password: Welcome@{rollNumber}
 *     tags: [Institution]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - students
 *             properties:
 *               students:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - email
 *                     - batchYear
 *                     - deptCategory
 *                     - deptCode
 *                   properties:
 *                     name: { type: string, example: "John Doe" }
 *                     email: { type: string, example: "john.doe@college.edu" }
 *                     batchYear: { type: integer, example: 2023 }
 *                     deptCategory: { type: string, enum: [CORE, NON-CORE], example: "CORE" }
 *                     deptCode: { type: string, example: "CS" }
 *     responses:
 *       200:
 *         description: Bulk student creation completed
 *       403:
 *         description: Forbidden - Institution role required
 */
router.post("/students/bulk", institutionController.bulkCreateStudents);

/**
 * @swagger
 * /private/api/institutions/students:
 *   get:
 *     summary: List institution students (Institution only)
 *     tags: [Institution]
 *     responses:
 *       200:
 *         description: List of students linked to the institution
 */
router.get("/students", institutionController.getStudents);

module.exports = router;


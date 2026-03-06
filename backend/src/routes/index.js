const express = require("express");
const router = express.Router();

// ─── Public Routes (no authentication required) ─────────────────────
const authRoutes = require("./public/auth");
const verifyRoutes = require("./public/verify");
const institutionRoutes = require("./public/institution");

// ─── Private Routes (JWT required) ──────────────────────────────────
const authMiddleware = require("../middlewares/auth.middleware");

const privateUserRoutes = require("./private/users");
const privateRecordRoutes = require("./private/records");
const privateAdminRoutes = require("./private/admin");
const privateShareRoutes = require("./private/share");
const privateInstitutionRoutes = require("./private/institution");

// Mount public routes
router.use("/public/api/auth", authRoutes);
router.use("/public/api/verify", verifyRoutes);
router.use("/public/api/institutions", institutionRoutes);

// Mount private routes (all require auth)
router.use("/private/api/users", authMiddleware, privateUserRoutes);
router.use("/private/api/records", authMiddleware, privateRecordRoutes);
router.use("/private/api/admin", authMiddleware, privateAdminRoutes);
router.use("/private/api/share", authMiddleware, privateShareRoutes);
router.use("/private/api/institutions", authMiddleware, privateInstitutionRoutes);

module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

// ─── Public Routes (no authentication required) ─────────────────────
const authRoutes = require("./public/auth");
const verifyRoutes = require("./public/verify");

// ─── Private Routes (JWT required) ──────────────────────────────────
const recordsRoutes = require("./private/records");
const shareRoutes = require("./private/share");
const adminRoutes = require("./private/admin");
const usersRoutes = require("./private/users");

// Mount public routes
router.use("/public/api/auth", authRoutes);
router.use("/public/api/verify", verifyRoutes);

// Mount private routes (all require auth)
router.use("/private/api/records", authMiddleware, recordsRoutes);
router.use("/private/api/share", authMiddleware, shareRoutes);
router.use("/private/api/admin", authMiddleware, adminRoutes);
router.use("/private/api/users", authMiddleware, usersRoutes);

module.exports = router;

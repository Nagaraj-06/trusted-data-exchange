const express = require("express");
const router = express.Router();
const institutionController = require("../../controllers/public/institution.controller");
const upload = require("../../middlewares/upload.middleware");

router.post("/register", upload.single("document"), institutionController.registerInstitution);
router.get("/status/:email", institutionController.getApplicationStatus);

module.exports = router;

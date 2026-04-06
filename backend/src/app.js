const express = require("express");
const path = require("path");
require("./config/env"); // Load .env
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { frontendUrl } = require("./config/env");
const swaggerDocs = require("./config/swagger");

const app = express();
app.set("trust proxy", 1); // Allow secure cookies behind reverse proxies

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// CORS
app.use(
    cors({
        origin: frontendUrl,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);

// Routes
app.get("/", (req, res) => res.send("Trusted Academic Data Exchange API is running"));

app.use(routes);

// Swagger docs
swaggerDocs(app);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;

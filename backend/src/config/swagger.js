const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { host, port } = require("../config/env");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Trusted Academic Data Exchange API",
            version: "1.0.0",
            description:
                "API documentation for the Trusted Academic Data Exchange Platform. " +
                "This platform allows institutions to issue verified academic records, " +
                "students to securely view and share them via expiring links, " +
                "and system admins to manage institutions and monitor activity.",
        },
        servers: [
            {
                url: `${host}:${port}`,
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: [
            { name: "Auth", description: "Authentication & Registration" },
            { name: "Verify", description: "Public Record Verification (No Login)" },
            { name: "Records", description: "Academic Records Management" },
            { name: "Share", description: "Shareable Link Management" },
            { name: "Users", description: "User Profile Management" },
            { name: "Admin", description: "System Administration" },
        ],
    },
    apis: ["./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📘 Swagger Docs available at ${host}:${port}/api-docs`);
}

module.exports = swaggerDocs;

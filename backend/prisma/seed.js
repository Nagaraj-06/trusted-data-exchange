const { prisma } = require("../src/config/db");

async function main() {
    console.log("Seeding database...");

    // TODO: Add seed data here
    // Example:
    // await prisma.user.create({ data: { ... } });

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

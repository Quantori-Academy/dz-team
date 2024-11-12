const { PrismaClient } = require("@prisma/client");
const reagents = require("./seedData/reagents.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET || "b82359e8-f0a5-41d4-8677-2180f836d8cd";

async function addAdmin() {
    const adminCount = await prisma.user.count({ where: { role: "admin" } });
    if (!adminCount) {
        const p4$$w0rd = await bcrypt.hash("admin123", 10);
        const admin = await prisma.user.create({
            data: {
                username: "admin",
                password: p4$$w0rd,
                role: "admin",
                firstName: "admin",
                lastName: "admin",
                email: "admin@vm4.net",
            },
        });
        const token = jwt.sign({ userId: admin.id, role: admin.role }, secret, { expiresIn: "1h" });
        console.log(`🚀 Admin token: ${token}`);
    } else {
        console.log("🗿 No new admin was created.");
    }
}

async function addReagents() {
    const reagentCount = await prisma.reagent.count();
    if (!reagentCount) {
        const result = await prisma.reagent.createMany({
            data: reagents,
            skipDuplicates: true,
        });
        console.log(`💉 Seeded database with ${result.count} reagent entries.`);
    }
    console.log("🥀 No new reagents were added.");
}

async function main() {
    await addAdmin();
    await addReagents();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

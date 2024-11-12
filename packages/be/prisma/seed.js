const { PrismaClient } = require("@prisma/client");
const reagents = require("./seedData/reagents.json");
const orders = require("./seedData/orders.json");
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
                id: "8d512b59-e0b8-4efc-8eb3-ccc1f4e8f704",
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

async function addOrders() {
    const orderCount = await prisma.order.count();
    if (!orderCount) {
        const result = await prisma.order.createMany({
            data: orders,
            skipDuplicates: true,
        });
        console.log(`💉 Seeded database with ${result.count} order entries.`);
    }
    console.log("🥀 No new orders were added.");
}

async function main() {
    await addAdmin();
    await addReagents();
    await addOrders();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

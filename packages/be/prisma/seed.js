const { PrismaClient } = require("@prisma/client");
const reagents = require("./seedData/reagents.json");
const samples = require("./seedData/samples.json");
const storage = require("./seedData/storage_db.json");
const orders = require("./seedData/orders.json");
const sellers = require("./seedData/sellers.json");
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

async function addStorage() {
    let storageCount = await prisma.storageLocation.count();
    if (!storageCount) {
        const result = await prisma.storageLocation.createMany({
            data: storage,
            skipDuplicates: true,
        });
        console.log(`💉 Seeded database with ${result.count} storage location records.`);
        storageCount = await prisma.storageLocation.count();
    } else {
        console.log("🥀 No new storage locations were added.");
    }
    return storageCount;
}

async function addReagents(storageCount) {
    const reagentCount = await prisma.reagent.count();
    if (!reagentCount) {
        const results = [];
        const storage = await prisma.storageLocation.findMany();
        for (let i = 0; i < reagents.length; ++i) {
            const reagent = {
                ...reagents[i],
                storageId: storage[Math.floor(Math.random() * storageCount)].id,
            };
            results.push(reagent);
        }
        const table = await prisma.reagent.createMany({
            data: results,
            skipDuplicates: true,
        });
        console.log(`💉 Seeded database with ${table.count} reagent records.`);
        return;
    }
    console.log("🥀 No new reagents were added.");
}

async function addSamples(storageCount) {
    const sampleCount = await prisma.sample.count();
    if (!sampleCount) {
        const results = [];
        const storage = await prisma.storageLocation.findMany();
        for (let i = 0; i < samples.length; ++i) {
            const sample = {
                ...samples[i],
                storageId: storage[Math.floor(Math.random() * storageCount)].id,
            };
            results.push(sample);
        }
        const table = await prisma.sample.createMany({
            data: results,
            skipDuplicates: true,
        });
        console.log(`💉 Seeded database with ${table.count} sample records.`);
        return;
    }
    console.log("🥀 No new samples were added.");
}

async function addSellers() {
    const sellerCount = await prisma.seller.count();
    if (!sellerCount) {
        const results = sellers.map(order => ({
            ...order,
        }));
        const table = await prisma.seller.createMany({
            data: results,
            skipDuplicates: true,
        });
        console.log(`📦 Seeded database with ${table.count} seller records.`);
    } else {
        console.log("🥀 No new sellers were added.");
    }
}

async function addOrders() {
    const orderCount = await prisma.order.count();
    if (!orderCount) {
        const results = orders.map(order => ({
            ...order,
        }));
        const table = await prisma.order.createMany({
            data: results,
            skipDuplicates: true,
        });
        console.log(`📦 Seeded database with ${table.count} order records.`);
    } else {
        console.log("🥀 No new orders were added.");
    }
}

async function cleanup(reagents, samples, storage) {
    const reagentCount = await prisma.reagent.count();
    const sampleCount = await prisma.sample.count();

    if (reagents) {
        const reagent = await prisma.reagent.deleteMany();
        console.log(`${reagent.count} reagents removed.`);
    }
    if (samples) {
        const sample = await prisma.sample.deleteMany();
        console.log(`${sample.count} samples removed.`);
    }
    if (storage) {
        if ((reagents || !reagentCount) && (samples || !sampleCount)) {
            const storage = await prisma.storageLocation.deleteMany();
            console.log(`${storage.count} storage locations removed.`);
        } else {
            console.log(`No storage removed. Remove all reagents and samples first.`);
        }
    }
}

async function main() {
    // create initial admin account
    await addAdmin();

    // choose what to remove
    let deleteReagents = false;
    let deleteSamples = false;
    let deleteStorage = false;

    if (deleteReagents || deleteSamples || deleteStorage) {
        cleanup(deleteReagents, deleteSamples, deleteStorage);
    } else {
        const storageCount = await addStorage();
        if (!storageCount) {
            console.log(
                "Reagents and samples require storage locations. No reagents or samples created.",
            );
        } else {
            await addReagents(storageCount);
            await addSamples(storageCount);
            await addSellers()
            await addOrders();

        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

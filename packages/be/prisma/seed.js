const { PrismaClient } = require("@prisma/client");
const reagents = require("./seedData/reagents.json");
const samples = require("./seedData/samples.json");
const storage = require("./seedData/storage_db.json");
const orders = require("./seedData/orders.json");
const reagentRequests = require("./seedData/requests.json");
const users = require("./seedData/users.json");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function addUsers() {
    for (const user of users) {
        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email: user.email }, { username: user.username }] },
        });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await prisma.user.create({
                data: {
                    ...user,
                    password: hashedPassword,
                },
            });
            console.log(`👤 User ${user.username} added.`);
        } else {
            console.log(
                `📍 User with email ${user.email} or username ${user.username} already exists.`,
            );
        }
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

async function addOrders() {
    const orderCount = await prisma.order.count();
    if (!orderCount) {
        const results = orders.map((order) => ({
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

async function addReagentRequests() {
    const reagentRequestCount = await prisma.reagentRequest.count();

    const defaultUser = await prisma.user.findFirst({
        where: { role: "admin" },
    });

    if (!defaultUser) {
        console.error("❌ No user found to associate reagent requests.");
        return;
    }

    const validRequestStatuses = ["pending", "ordered", "declined", "completed"];

    if (!reagentRequestCount) {
        const results = reagentRequests.map((req) => {
            // Ensure these fields are set properly for data that lacks them
            return {
                ...req,
                userId: req.userId || defaultUser.id, // Default to admin ID if undefined
                orderId: req.orderId || undefined, // Explicitly use undefined if there's no order
                status: validRequestStatuses.includes(req.status) ? req.status : "pending",
                createdAt: new Date(req.createdAt).toISOString(),
                updatedAt: new Date(req.updatedAt).toISOString(),
            };
        });

        try {
            const table = await prisma.reagentRequest.createMany({
                data: results,
                skipDuplicates: true,
            });
            console.log(`📄 Seeded database with ${table.count} reagent request records.`);
        } catch (error) {
            console.error("Error seeding reagent requests:", error);
        }
    } else {
        console.log("🥀 No new reagent requests were added.");
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
            await addUsers();
            await addReagents(storageCount);
            await addSamples(storageCount);
            await addOrders();
            await addReagentRequests();
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

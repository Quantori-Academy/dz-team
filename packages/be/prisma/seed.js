const { PrismaClient } = require('@prisma/client');
const reagents = require('./seedData/reagents.json');

const prisma = new PrismaClient();

async function addReagents() {
    const result = await prisma.reagent.createMany({
        data: reagents,
        skipDuplicates: true,
    });
    console.log(`Seeded database with ${result.count} reagent entries.`);
}

async function main() {
    // comment out to avoid duplicate data
    await addReagents();
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

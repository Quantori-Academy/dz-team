const { PrismaClient } = require("@prisma/client");
const { reagents } = require("./seedData/reagents");

const prisma = new PrismaClient();

async function main() {
    // add reagents
    await prisma.reagent.createMany({ data: reagents });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

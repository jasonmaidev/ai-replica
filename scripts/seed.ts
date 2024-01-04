const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Famous People" },
        { name: "Pokemons" },
        { name: "Cartoon" },
        { name: "Anime" },
        { name: "Games" },
        { name: "Animals" },
        { name: "Movies & TV" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();

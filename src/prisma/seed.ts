import { prisma } from './client';

async function main() {
  try {
    console.log('Start seeding');

    // seeding

    console.log('Seeding finished');
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

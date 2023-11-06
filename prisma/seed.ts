import prisma from "../src/utils/prisma";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  await prisma.accountNumber.upsert({
    where: {
      id,
    },
    create: {
      id,
      accountnumber: `0082575720`,
      banker: 'First Bank Plc',
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
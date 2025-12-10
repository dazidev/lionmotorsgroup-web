import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.user.deleteMany();

  const { users, leads } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.lead.createMany({
    data: leads,
  });

  console.log("DB sync successfull!");
}

(() => {
  main();
})();

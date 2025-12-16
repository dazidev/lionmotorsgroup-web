import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.user.deleteMany();

  const { users, leads, vehicles } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.lead.createMany({
    data: leads,
  });

  await prisma.vehicle.createMany({
    data: vehicles,
  });

  console.log("DB sync successfull!");
}

(() => {
  main();
})();

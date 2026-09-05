import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  const { users, leads, vehicles, reviews } = initialData;

  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: users,
  });

  await prisma.reviews.deleteMany();
  await prisma.reviews.createMany({
    data: reviews,
  });

  /*await prisma.lead.createMany({
    data: leads,
  });*/

  /*await prisma.vehicleGeneral.createMany({
    data: vehicles,
  });*/

  console.log("DB sync successfull!");
}

(() => {
  main();
})();

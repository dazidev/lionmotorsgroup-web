import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.user.deleteMany();

  const { users, leads, vehicles, reviews } = initialData;

  /*await prisma.user.createMany({
    data: users,
  });*/

  /*await prisma.lead.createMany({
    data: leads,
  });*/

  /*await prisma.vehicleGeneral.createMany({
    data: vehicles,
  });*/

  await prisma.reviews.createMany({
    data: reviews,
  });

  console.log("DB sync successfull!");
}

(() => {
  main();
})();

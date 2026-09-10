import { Prisma } from "@prisma/client";

export async function lockVehicleRow(
  tx: Prisma.TransactionClient,
  vehicleId: string,
): Promise<boolean> {
  const rows = await tx.$queryRaw<Array<{ id: string }>>`
    SELECT "id"
    FROM "vehicles_general"
    WHERE "id" = ${vehicleId}
    FOR UPDATE
  `;

  return rows.length > 0;
}

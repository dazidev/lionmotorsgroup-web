import bcrypt from "bcrypt";

type UserRoles = "admin" | "moderator" | "user";

interface SeedUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRoles;
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      name: "Daniel",
      lastname: "Zipa",
      email: "redacted@example.com",
      password: bcrypt.hashSync("REDACTED", 10),
      role: "admin",
    },
    {
      name: "Juan",
      lastname: "D'Agostini",
      email: "juan@outlook.com",
      password: bcrypt.hashSync("REDACTED", 10),
      role: "admin",
    },
  ],
};

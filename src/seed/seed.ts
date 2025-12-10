import bcrypt from "bcrypt";

type UserRoles = "admin" | "moderator" | "user";

interface SeedUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRoles;
}

type StatusLead = "unattended" | "attended";

interface SeedLead {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  zipcode: string;
  comments: string;
  status: StatusLead;
}

interface SeedData {
  users: SeedUser[];
  leads: SeedLead[];
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
  leads: [
    {
      name: "Oscar",
      lastname: "Zipa",
      email: "oscar@gmail.com",
      phoneNumber: "+1 6695487451",
      zipcode: "62514-8956",
      comments: "I need information about this car.",
      status: "unattended",
    },
    {
      name: "Angelica",
      lastname: "Rosales",
      email: "angelica@gmail.com",
      phoneNumber: "+1 6695487451",
      zipcode: "62514-8956",
      comments: "I need information about this car.",
      status: "unattended",
    },
    {
      name: "Omar",
      lastname: "Perez",
      email: "omarperez@gmail.com",
      phoneNumber: "+1 6695487451",
      zipcode: "62514-8956",
      comments: "I need information about this car.",
      status: "unattended",
    },
  ],
};

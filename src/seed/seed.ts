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

interface SeedVehicle {
  vin: string;
  year: number;
  brand: string;
  model: string;
  mileage: number;
  price: number;
  status: "in_stock" | "on_sale" | "sold";
}

interface SeedData {
  users: SeedUser[];
  leads: SeedLead[];
  vehicles: SeedVehicle[];
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
  vehicles: [
    {
      vin: "1FT8W3BT4MEE15325",
      year: 2021,
      brand: "Ford",
      model: "F-350 Lariat",
      mileage: 88068,
      price: 48095,
      status: "in_stock",
    },
    {
      vin: "WUARU78E07N907366",
      year: 2007,
      brand: "AUDI",
      model: "RS 4 4.2L",
      mileage: 97716,
      price: 28995,
      status: "on_sale",
    },
    {
      vin: "2HGFC3A54LH754274",
      year: 2020,
      brand: "Honda",
      model: "Civic Si",
      mileage: 92312,
      price: 21995,
      status: "sold",
    },
  ],
};

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
      brand: "Audi",
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
    {
      vin: "1C4RJFBG0FC625798",
      year: 2015,
      brand: "Jeep",
      model: "Grand Cherokee Limited",
      mileage: 104233,
      price: 19995,
      status: "in_stock",
    },
    {
      vin: "3VW2B7AJ5HM372114",
      year: 2017,
      brand: "Volkswagen",
      model: "Jetta SE",
      mileage: 81245,
      price: 14995,
      status: "on_sale",
    },
    {
      vin: "5UXWX9C58H0T12345",
      year: 2017,
      brand: "BMW",
      model: "X3 xDrive28i",
      mileage: 75632,
      price: 23995,
      status: "sold",
    },
    {
      vin: "1HGCR2F3XFA123456",
      year: 2015,
      brand: "Honda",
      model: "Accord Sport",
      mileage: 110482,
      price: 16995,
      status: "in_stock",
    },
    {
      vin: "1N4AL3AP9GC123789",
      year: 2016,
      brand: "Nissan",
      model: "Altima SV",
      mileage: 98741,
      price: 13995,
      status: "on_sale",
    },
    {
      vin: "3FA6P0HD9HR298741",
      year: 2017,
      brand: "Ford",
      model: "Fusion SE",
      mileage: 84512,
      price: 15995,
      status: "sold",
    },
    {
      vin: "2C4RC1BG5KR512398",
      year: 2019,
      brand: "Chrysler",
      model: "Pacifica Touring",
      mileage: 65421,
      price: 25995,
      status: "in_stock",
    },
    {
      vin: "1G1ZE5ST8GF245678",
      year: 2016,
      brand: "Chevrolet",
      model: "Malibu LT",
      mileage: 92144,
      price: 14995,
      status: "on_sale",
    },
    {
      vin: "JM1BN1V75H1123456",
      year: 2017,
      brand: "Mazda",
      model: "Mazda3 Touring",
      mileage: 73450,
      price: 15995,
      status: "sold",
    },
    {
      vin: "1FA6P8TH0J5109876",
      year: 2018,
      brand: "Ford",
      model: "Mustang EcoBoost",
      mileage: 48230,
      price: 24995,
      status: "in_stock",
    },
    {
      vin: "5N1AT2MV0KC654321",
      year: 2019,
      brand: "Nissan",
      model: "Rogue SV",
      mileage: 56981,
      price: 22995,
      status: "on_sale",
    },
    {
      vin: "2T3RFREV4JW789456",
      year: 2018,
      brand: "Toyota",
      model: "RAV4 XLE",
      mileage: 61234,
      price: 23995,
      status: "sold",
    },
    {
      vin: "1HGCV1F14JA123987",
      year: 2018,
      brand: "Honda",
      model: "Accord Touring",
      mileage: 54872,
      price: 26995,
      status: "in_stock",
    },
    {
      vin: "JTDKBRFU5J3123456",
      year: 2018,
      brand: "Toyota",
      model: "Prius Two",
      mileage: 78920,
      price: 21995,
      status: "on_sale",
    },
    {
      vin: "1C6RR7FT3KS845612",
      year: 2019,
      brand: "RAM",
      model: "1500 Big Horn",
      mileage: 70345,
      price: 32995,
      status: "sold",
    },
    {
      vin: "SALWR2SE6KA123456",
      year: 2019,
      brand: "Land Rover",
      model: "Range Rover Sport",
      mileage: 45812,
      price: 58995,
      status: "in_stock",
    },
    {
      vin: "WA1LAAF70KD987321",
      year: 2019,
      brand: "Audi",
      model: "Q7 Premium Plus",
      mileage: 49782,
      price: 41995,
      status: "on_sale",
    },
    {
      vin: "1GYS4HKJ2KR123654",
      year: 2019,
      brand: "Cadillac",
      model: "Escalade Luxury",
      mileage: 61200,
      price: 55995,
      status: "sold",
    },
    {
      vin: "3TMCZ5AN5LM987456",
      year: 2020,
      brand: "Toyota",
      model: "Tacoma TRD Sport",
      mileage: 38214,
      price: 34995,
      status: "in_stock",
    },
    {
      vin: "5UXCR6C05L9123789",
      year: 2020,
      brand: "BMW",
      model: "X5 xDrive40i",
      mileage: 42135,
      price: 49995,
      status: "on_sale",
    },
    {
      vin: "1FM5K8D80LGA12345",
      year: 2020,
      brand: "Ford",
      model: "Explorer XLT",
      mileage: 46782,
      price: 31995,
      status: "sold",
    },
    {
      vin: "KM8J3CA46LU987654",
      year: 2020,
      brand: "Hyundai",
      model: "Tucson SEL",
      mileage: 52314,
      price: 22995,
      status: "in_stock",
    },
    {
      vin: "5YJ3E1EA7LF123987",
      year: 2020,
      brand: "Tesla",
      model: "Model 3 Standard Range",
      mileage: 34120,
      price: 36995,
      status: "on_sale",
    },
    {
      vin: "JN8AT2MT4LW654123",
      year: 2020,
      brand: "Nissan",
      model: "Rogue SL",
      mileage: 49870,
      price: 24995,
      status: "sold",
    },
    {
      vin: "1FTFW1E50LFA98712",
      year: 2020,
      brand: "Ford",
      model: "F-150 XLT",
      mileage: 55642,
      price: 37995,
      status: "in_stock",
    },
    {
      vin: "2GNAXKEV8L6123456",
      year: 2020,
      brand: "Chevrolet",
      model: "Equinox LT",
      mileage: 60431,
      price: 23995,
      status: "on_sale",
    },
    {
      vin: "WBA3A5C56LF789321",
      year: 2020,
      brand: "BMW",
      model: "330i",
      mileage: 43895,
      price: 33995,
      status: "sold",
    },
  ],
};

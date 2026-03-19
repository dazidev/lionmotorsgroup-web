export interface VehicleResponse {
  general: {
    vin: string;
    year: string;
    brand: string;
    model: string;
    series: string;
    doors: string;
  };
  technical: {
    fuelType: string;
    engine: {
      configuration: string;
      cylinders: string;
      power: string;
      displacement: string;
      turbo: string;
    };
    drivetrain: string;
    transmission: string;
  };
}

type StatusVehicle = "in_stock" | "on_sale" | "sold";

export interface Vehicle {
  //* General
  id: string;
  vin: string;
  year: number;
  brand: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    imagePath: string;
  };
  model: string;
  series: string;
  mileage: number;
  price: number;
  status: StatusVehicle;
  doors: number;
  colorExt: string;
  colorInt: string;
  type: string;
  investment: number;

  //* Technical
  engineFuelType: string;
  engineConfiguration: string;
  engineCylinders: number;
  enginePower: number;
  engineDisplacement: number;
  engineTurbo: string;
  drivetrain: string;
  transmission: string;
}

export interface VehicleState {
  //* General
  vin: string;
  year: string;
  brand: string;
  model: string;
  series: string;
  mileage: string;
  price: string;
  status: string;
  doors: string;
  colorExt: string;
  colorInt: string;
  type: string;
  investment: string;

  //* Technical
  engineFuelType: string;
  engineConfiguration: string;
  engineCylinders: string;
  enginePower: string;
  engineDisplacement: string;
  engineTurbo: string;
  drivetrain: string;
  transmission: string;
}

export interface Brands {
  id: string;
  name: string;
  imagePath: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Specifications {
  id: string;
  type: string;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface DataImage {
  mime: string;
  ext: string | undefined;
  size: number;
}

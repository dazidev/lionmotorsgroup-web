import { InvestmentResponse } from "./investment";

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
  engineFuelType: FuelType;
  engineConfiguration: string;
  engineCylinders: string;
  enginePower: string;
  engineDisplacement: string;
  engineTurbo: string;
  drivetrain: DrivetrainType;
  transmission: TransmissionType;
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

export interface BasicVehicleResponse {
  id: string;
  vin: string;
  year: number;
  model: string;
  status: string;
  price: number;
  investment: number;
  createdAt: Date;
  updatedAt: Date;
  brand: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    imagePath: string;
  };
  investments: InvestmentResponse[];
}

export interface VehicleCardInterface {
  id: string;
  brand: {
    name: string;
  };
  slug: string;
  shortId: string | null;
  model: string;
  year: number;
  mileage: number;
  price: number;
  technical: {
    drivetrain: DrivetrainType;
    transmission: TransmissionType;
    engineFuelType: FuelType;
  } | null;
  colorExt: string;
  images: {
    // Prisma devuelve array porque es relación
    key: string;
    // agrega aquí otros campos si existen en tu modelo (ej: url, id)
    // id: string;
    // url: string;
  }[];
}

export type FuelType = "gasoline" | "diesel" | "hybrid" | "electric" | "gas";
export type DrivetrainType = "FOUR_X_FOUR" | "FOUR_X_TWO";
export type TransmissionType = "automatic" | "manual";

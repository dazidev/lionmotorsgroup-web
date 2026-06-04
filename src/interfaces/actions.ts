export interface ServerResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

type TypeSpecification = "security" | "confort" | "visual";

export interface Specification {
  id: string;
  type: TypeSpecification;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

type TypeDataImage = {
  url: string;
  key: string;
};

export interface CreateVehicleResponse {
  urls: TypeDataImage[];
  vehicleId: string;
}

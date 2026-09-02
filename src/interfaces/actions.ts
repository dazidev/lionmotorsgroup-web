export interface ServerResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

type TypeDataImage = {
  url: string;
  key: string;
};

export interface CreateVehicleResponse {
  urls: TypeDataImage[];
  vehicleId: string;
}

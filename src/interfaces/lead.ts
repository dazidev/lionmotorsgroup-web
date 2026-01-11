type StatusLead = "unattended" | "attended";

export interface Lead {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string | null;
  zipcode: string | null;
  comments: string | null;
  status: StatusLead;
  vehicleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
}

export interface FormLead {
  name: string;
  lastname: string;
  email: string;
  zipcode: string;
  phoneNumber: string;
  comments: string;
  vehicleId: string;
}

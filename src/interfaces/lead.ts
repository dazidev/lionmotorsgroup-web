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
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
}

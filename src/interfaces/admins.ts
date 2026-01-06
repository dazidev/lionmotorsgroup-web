export interface AdminForm {
  name: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
}

export interface PromiseResponse {
  success: boolean;
  message?: string;
}

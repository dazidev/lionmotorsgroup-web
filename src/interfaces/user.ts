export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
}

export interface UserResponse {
  success: boolean;
  data: User[];
}

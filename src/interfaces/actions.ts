export interface ServerResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

type TypeSpecification = "security" | "confort";

export interface Specification {
  id: string;
  type: TypeSpecification;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

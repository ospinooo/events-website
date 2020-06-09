export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  roles: Role[];
  points: number;
}

import { Request } from "express";

export interface UserI {
  id: number;
  email: string;
  name: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: UserI;
}

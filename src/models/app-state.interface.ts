import { User } from "./user.interface";

export interface AppState {
  auth: AuthState;
}

export interface AuthState {
  isAuth: boolean;
  user?: User | null;
}

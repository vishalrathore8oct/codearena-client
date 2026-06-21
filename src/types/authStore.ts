import type { LogInForm } from "./LogInForm";
import type { SignUpForm } from "./signUpForm";

export interface AuthState {
  authUser: any | null;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  login: (data: LogInForm) => Promise<void>;
  signup: (data: SignUpForm) => Promise<void>;
  logout: () => Promise<void>;
}

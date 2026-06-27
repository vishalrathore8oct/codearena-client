import type { LogInForm } from "./LogInForm";
import type { SignUpForm } from "./signUpForm";

export interface AuthState {
  authUser: any | null;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  login: (data: LogInForm) => Promise<void>;
  signup: (data: SignUpForm) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

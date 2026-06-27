import { Code, Eye, EyeOff, LoaderPinwheel, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import useAuthStore from "../store/useAuthStore";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !password) return;

    setIsSubmitting(true);
    try {
      await resetPassword(token, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setPassword("");
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">New Password</h1>
              <p className="text-base-content/60">
                Enter your new secure password
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">New Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting || !password}
            >
              {isSubmitting ? (
                <>
                  <LoaderPinwheel className="h-5 w-5 animate-spin mr-2" />{" "}
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              <Link to="/login" className="link link-primary">
                Back to log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Secure your account"
        subtitle="Make sure your new password is at least 6 characters long."
      />
    </div>
  );
};

export default ResetPassword;

import { Code, LoaderPinwheel, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import useAuthStore from "../store/useAuthStore";

const ResendVerificationEmail = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resendVerificationEmail } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await resendVerificationEmail(email);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setEmail("");
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
              <h1 className="text-2xl font-bold mt-2">Resend Verification</h1>
              <p className="text-base-content/60">
                Didn't receive the email? We'll send it again.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? (
                <>
                  <LoaderPinwheel className="h-5 w-5 animate-spin mr-2" />{" "}
                  Sending...
                </>
              ) : (
                "Resend Email"
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
        title="Check your inbox"
        subtitle="Verification emails sometimes end up in your spam folder, so be sure to check there too!"
      />
    </div>
  );
};

export default ResendVerificationEmail;

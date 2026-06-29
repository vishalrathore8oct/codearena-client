import { CheckCircle2, LoaderPinwheel, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const { verifyEmail } = useAuthStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const hasAttempted = useRef(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      if (hasAttempted.current) return;
      hasAttempted.current = true;

      try {
        await verifyEmail(token);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.error(error);
      }
    };
    verify();
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-2xl p-8 text-center space-y-6">
        {status === "loading" && (
          <>
            <LoaderPinwheel className="w-16 h-16 animate-spin text-primary mx-auto" />
            <h2 className="text-2xl font-bold">Verifying your email...</h2>
            <p className="text-base-content/60">
              Please wait a moment while we verify your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
            <h2 className="text-2xl font-bold">Email Verified!</h2>
            <p className="text-base-content/60">
              Your account has been successfully verified.
            </p>
            <Link to="/login" className="btn btn-primary w-full mt-4">
              Proceed to Log In
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-error mx-auto" />
            <h2 className="text-2xl font-bold">Verification Failed</h2>
            <p className="text-base-content/60">
              The verification link is invalid or has expired.
            </p>
            <Link
              to="/resend-verification"
              className="btn btn-primary w-full mt-4"
            >
              Resend Verification Email
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;

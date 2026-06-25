import { ArrowLeft, Code, Home } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import useAuthStore from "../store/useAuthStore";

const NotFound = () => {
  const { authUser } = useAuthStore();
  const fallbackLink = authUser ? "/" : "/login";
  const fallbackLabel = authUser ? "Go back home" : "Go to Login";

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="max-w-xl mx-auto space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary font-semibold text-sm">
            <Code className="w-4 h-4" />
            Page not found
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              404
            </h1>
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Oops, this page has gone missing.
              </h2>
              <p className="text-base-content/70 leading-8 text-lg">
                The page you are looking for may have been removed, had its name
                changed, or is temporarily unavailable. Use the button below to
                continue with the app experience.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to={fallbackLink}
              className="btn btn-primary w-full justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              {fallbackLabel}
            </Link>
            <Link
              to="/"
              className="btn btn-outline w-full justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to homepage
            </Link>
          </div>

          <div className="rounded-3xl border border-base-200/70 bg-base-200/70 p-6 shadow-sm">
            <p className="text-base-content/75 leading-7">
              You can also check the URL for mistakes, refresh the page, or use
              the app navigation to find what you need.
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Let us help you get back on track."
        subtitle="Find a working route quickly with our home page and app navigation."
      />
    </div>
  );
};

export default NotFound;

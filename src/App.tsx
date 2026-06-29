import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./components/AdminRoutes";
import GlobalToaster from "./components/GlobalToaster";
import LoadingState from "./components/LoadingState";
import HomeLayout from "./layouts/HomeLayout";
import AddProblem from "./pages/AddProblem";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LogIn from "./pages/LogInPage";
import NotFound from "./pages/NotFound";
import ProblemPage from "./pages/ProblemPage";
import ResendVerificationEmail from "./pages/ResendVerificationEmail";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUpPage";
import VerifyEmail from "./pages/VerifyEmail";
import useAuthStore from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <LoadingState
        title="Authenticating..."
        description="Please wait while we verify your session."
        className="h-screen bg-base-200"
      />
    );
  }

  return (
    <>
      <GlobalToaster />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={authUser ? <HomePage /> : <LandingPage />} />
        </Route>

        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LogIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/verify-email/:token"
          element={!authUser ? <VerifyEmail /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!authUser ? <ForgotPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/reset-password/:token"
          element={!authUser ? <ResetPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/resend-verification"
          element={
            !authUser ? <ResendVerificationEmail /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/problem/:id"
          element={authUser ? <ProblemPage /> : <Navigate to={"/login"} />}
        />
        <Route element={<AdminRoutes />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to={"/"} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

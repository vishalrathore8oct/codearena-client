import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./components/AdminRoutes";
import GlobalToaster from "./components/GlobalToaster";
import LoadingState from "./components/LoadingState";
import HomeLayout from "./layouts/HomeLayout";
import AddProblem from "./pages/AddProblem";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import ProblemPage from "./pages/ProblemPage";
import SignUp from "./pages/SignUp";
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
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
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

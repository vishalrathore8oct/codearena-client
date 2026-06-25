import { LoaderPinwheel } from "lucide-react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./components/AdminRoutes";
import GlobalToaster from "./components/GlobalToaster";
import HomeLayout from "./layouts/HomeLayout";
import AddProblem from "./pages/AddProblem";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import useAuthStore from "./store/authStore.";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderPinwheel className="size-10 animate-spin" />
      </div>
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

import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";

const App = () => {
  let authUser = null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/log-in"} />}
        />
        <Route
          path="/sign-up"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/log-in"
          element={!authUser ? <LogIn /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

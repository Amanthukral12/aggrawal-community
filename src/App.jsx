import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/dashboard/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

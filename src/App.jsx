import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/dashboard/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import PasswordReset from "./components/auth/PasswordReset";
import UpdatePassword from "./components/auth/UpdatePassword";
import Account from "./components/profile/Account";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/update-profile" element={<Account />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/dashboard/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import PasswordReset from "./components/auth/PasswordReset";
import UpdatePassword from "./components/auth/UpdatePassword";
import Account from "./components/profile/Account";
import MembersList from "./components/members/MembersList";
import Navbar from "./components/navbar/Navbar";
import Posts from "./components/posts/Posts";
import Events from "./components/events/Events";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/update-profile" element={<Account />} />
          <Route path="/members" element={<MembersList />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/events" element={<Events />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </>
  );
}

export default App;

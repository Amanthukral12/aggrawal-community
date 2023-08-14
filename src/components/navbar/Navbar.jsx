import { useState } from "react";
import { UserAuth } from "../../contexts/AuthProvider";
import { UseProfile } from "../../contexts/ProfileContext";
useState;
const Navbar = () => {
  const { auth, logout } = UserAuth();
  const { currentProfile } = UseProfile();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await logout();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>{auth && <button onClick={handleLogout}>Logout</button>}</div>
      <img
        src={currentProfile.profile_photo}
        height="50px"
        width="50px"
        alt=""
      />
    </div>
  );
};

export default Navbar;

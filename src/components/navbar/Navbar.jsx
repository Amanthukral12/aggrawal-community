import { useState } from "react";
import { UserAuth } from "../../contexts/AuthProvider";
import { UseProfile } from "../../contexts/ProfileContext";
import "./styles.css";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../sidebar/Sidebar";
const Navbar = () => {
  const { auth, logout } = UserAuth();
  const { currentProfile } = UseProfile();
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

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
    <div className="navMain">
      <GiHamburgerMenu
        className="icon"
        onClick={() => setShowSidebar(!showSidebar)}
      />
      <Sidebar
        shown={showSidebar}
        close={() => setShowSidebar(!showSidebar)}
      ></Sidebar>
      <p className="navHeading">Aggrawal Community</p>
      {auth && (
        <img
          src={currentProfile.profile_photo}
          className="profilePicture"
          alt=""
          onClick={() => setShowModal(!showModal)}
        />
      )}
      <Modal
        shown={showModal}
        close={() => {
          setShowModal(false);
        }}
      >
        <p className="userName">
          {currentProfile.first_name} {currentProfile.last_name}
        </p>

        <Link
          to={"/update-profile"}
          onClick={() => setShowModal(!showModal)}
          className="updateProfile"
        >
          Update Profile
        </Link>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      </Modal>
    </div>
  );
};

export default Navbar;

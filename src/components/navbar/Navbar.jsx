import { useState } from "react";
import { UserAuth } from "../../contexts/AuthProvider";
import { UseProfile } from "../../contexts/ProfileContext";
import "./styles.css";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../sidebar/Sidebar";
const Navbar = () => {
  const { session, logout } = UserAuth();
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
      {session && (
        <GiHamburgerMenu
          className="icon"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      )}
      <Sidebar shown={showSidebar} close={() => setShowSidebar(!showSidebar)}>
        <h3 className="appName">Sri Aggarwal Sewa Samiti</h3>
        <hr className="horizontalLine" />
      </Sidebar>

      {session ? (
        <>
          <Link to={"/"} className="navHeading">
            Sri Aggarwal Sewa Samiti
          </Link>
          <img
            src={currentProfile.profile_photo}
            className="profilePicture"
            alt="User Photo"
            onClick={() => setShowModal(!showModal)}
          />
        </>
      ) : (
        <h1 className="navHeading1">Sri Aggarwal Sewa Samiti</h1>
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

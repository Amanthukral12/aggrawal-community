import { Link } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import { UseProfile } from "../../contexts/ProfileContext";

const Home = () => {
  const { currentProfile } = UseProfile();

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <span>Welcome {currentProfile.first_name}</span>
      <Link to={"/update-profile"}>Update Profile</Link>
    </div>
  );
};

export default Home;

import { Link } from "react-router-dom";

import { UseProfile } from "../../contexts/ProfileContext";

const Home = () => {
  const { currentProfile } = UseProfile();

  return (
    <div>
      <span>Welcome {currentProfile.first_name}</span>
      <Link to={"/update-profile"}>Update Profile</Link>
    </div>
  );
};

export default Home;

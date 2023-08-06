import { UserAuth } from "../../contexts/AuthProvider";
import Navbar from "../navbar/Navbar";

const Home = () => {
  const { user } = UserAuth();

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <span>Welcome {user.email}</span>
    </div>
  );
};

export default Home;

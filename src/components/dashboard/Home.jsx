import { UserAuth } from "../../contexts/AuthProvider";

const Home = () => {
  const { user } = UserAuth();

  return <div>Welcome {user.email}</div>;
};

export default Home;

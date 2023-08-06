import { UserAuth } from "../../contexts/AuthProvider";

const Navbar = () => {
  const { auth, logout } = UserAuth();
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
    </div>
  );
};

export default Navbar;

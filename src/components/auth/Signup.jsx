import { useState } from "react";
import supabase from "../../supabaseClient";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async () => {
    console.log(email, password);
  };
  return (
    <>
      <h1>Signup</h1>
      <form action="">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleSignup()}>Signup</button>
      </form>
    </>
  );
};

export default Signup;

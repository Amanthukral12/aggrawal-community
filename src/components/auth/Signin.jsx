import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthProvider";

const Signin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = UserAuth();

  const handleErrorMessage = () => {
    setTimeout(function () {
      setErrorMsg("");
    }, 3000);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill all the fields");
        return;
      }
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const {
        data: { user, session },
        error,
      } = await login(email, password);

      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMsg("Email or Password Incorrect");
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Signin</h1>
      <form onSubmit={handleSignin}>
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />

        {errorMsg && <div>{errorMsg}</div>}
        {errorMsg ? handleErrorMessage() : null}

        <button disabled={loading}>Sign In</button>
      </form>
      <div>
        New User? <Link to={"/signup"}>Signup</Link>
      </div>
      <div>
        Forgot password? <Link to={"/reset-password"}>Click here</Link>
      </div>
    </>
  );
};

export default Signin;

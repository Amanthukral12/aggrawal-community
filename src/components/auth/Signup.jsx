import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthProvider";
import "./styles.css";
const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup } = UserAuth();

  const handleErrorMessage = () => {
    setTimeout(function () {
      setErrorMsg("");
    }, 3000);
  };
  const handleSuccessMessage = () => {
    setTimeout(function () {
      setMsg("");
      navigate("/signin");
    }, 3000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const { data, error } = await signup(email, password);

      if (!error && data) {
        setMsg("Registration Successful. Redirecting to login page");
      }
    } catch (error) {
      setErrorMsg("Error in creating Account");
    }
    setLoading(false);
  };
  return (
    <>
      <h1 className="heading">Signup</h1>
      <form onSubmit={handleSignup} className="form">
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
          required
          className="input"
        />
        {errorMsg && <div className="msg">{errorMsg}</div>}
        {errorMsg ? handleErrorMessage() : null}

        {msg && <div className="msg">{msg}</div>}
        {msg ? handleSuccessMessage() : null}
        <button className="submitButton" disabled={loading}>
          Signup
        </button>
      </form>
      <div className="extra">
        Aleady a User?{" "}
        <Link to={"/signin"} className="extra">
          Login
        </Link>
      </div>
    </>
  );
};

export default Signup;

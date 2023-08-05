import { useState, useRef } from "react";
import supabase from "../../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (!error && data) {
        setMsg(
          "Registration Successful. Check your email to confirm your account"
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Error in creating Account");
    }
    setLoading(false);
  };
  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
          required
        />
        {errorMsg && <div>{errorMsg}</div>}
        {errorMsg ? handleErrorMessage() : null}

        {msg && <div>{msg}</div>}
        {msg ? handleSuccessMessage() : null}
        <button disabled={loading}>Signup</button>
      </form>
      <div>
        Aleady a User? <Link to={"/signin"}>Login</Link>
      </div>
    </>
  );
};

export default Signup;

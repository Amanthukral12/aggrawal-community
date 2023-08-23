import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabaseClient";
import "./styles.css";
const PasswordReset = () => {
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSuccessMessage = () => {
    setTimeout(function () {
      setMsg("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(emailRef.current.value);
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        emailRef.current.value,
        {
          redirectTo: "https://aggrawal-community.netlify.app/update-password",
        }
      );
      setMsg("Password reset has been sent to you email");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      <h1 className="heading">Reset Password</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="email" required ref={emailRef} className="input" />
        {msg && <div className="msg">{msg}</div>}
        {msg ? handleSuccessMessage() : null}
        <button disabled={loading} className="submitButton">
          Send reset Link
        </button>
      </form>
      <div className="extra">
        Back to Login?{" "}
        <Link to={"/signin"} className="extra">
          Login
        </Link>
      </div>
    </>
  );
};

export default PasswordReset;

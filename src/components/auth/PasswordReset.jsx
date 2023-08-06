import { useRef, useState } from "react";
import { UserAuth } from "../../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const PasswordReset = () => {
  const { passwordReset } = UserAuth();
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
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
          redirectTo: "http://localhost:5173/update-password",
        }
      );
      console.log(error);
      console.log(data);
      setMsg("Password reset has been sent to you email");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div>
      <span>Reset Password</span>
      <form onSubmit={handleSubmit}>
        <input type="email" required ref={emailRef} />
        {msg && <div>{msg}</div>}
        {msg ? handleSuccessMessage() : null}
        <button disabled={loading}>Send reset Link</button>
      </form>
      <div>
        back to Login? <Link to={"/signin"}>Login</Link>
      </div>
    </div>
  );
};

export default PasswordReset;

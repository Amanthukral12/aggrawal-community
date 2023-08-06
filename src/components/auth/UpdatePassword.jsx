import { useRef, useState } from "react";
import { UserAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { updatePassword } = UserAuth();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleErrorMessage = () => {
    setTimeout(function () {
      setErrorMsg("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordRef.current?.value || !confirmPasswordRef.current?.value) {
      setErrorMsg("Please fill all the fields");
      return;
    }

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setErrorMsg("Passwords doesn't match. Try again");
      return;
    }

    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await updatePassword(passwordRef.current.value);
      console.log(error);
      if (!error && data) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Error in updating password. Please try again");
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="password" ref={passwordRef} required />
          <input type="password" ref={confirmPasswordRef} required />
          {errorMsg && <div>{errorMsg}</div>}
          {errorMsg ? handleErrorMessage() : null}
          <button disabled={loading}>Update Password</button>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;

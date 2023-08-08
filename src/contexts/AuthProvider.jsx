import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import propTypes from "prop-types";

const AuthContext = createContext();

const signup = (email, password) => {
  return supabase.auth.signUp({ email, password });
};

const login = (email, password) => {
  return supabase.auth.signInWithPassword({ email, password });
};

const logout = () => {
  return supabase.auth.signOut();
};

const passwordReset = (email) => {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password",
  });
};

const updatePassword = (updatedPassword) => {
  return supabase.auth.updateUser({ password: updatedPassword });
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      setUser(user);
    }
    setLoading(false);

    const { data } = supabase.auth.onAuthStateChange((e, session) => {
      if (e == "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (e == "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      } else if (e == "PASSWORD_RECOVERY") {
        setAuth(false);
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        auth,
        passwordReset,
        updatePassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const UserAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: propTypes.node,
};

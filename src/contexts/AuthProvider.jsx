import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import propTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useState(false);

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

  const [session, setSession] = useState(
    JSON.parse(sessionStorage.getItem("session"))
  );

  useEffect(() => {
    setSession(JSON.parse(sessionStorage.getItem("session")));
    setAuth(true);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("session", JSON.stringify(session));
    setAuth(true);
  }, [session]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (e, _session) => {
      if (e === "SIGNED_IN") {
        setAuth(true);
        setSession(_session);
        setUser(_session.user);
      } else if (e == "SIGNED_OUT") {
        setSession(null);
        setUser(null);
        setAuth(false);
      } else if (e == "PASSWORD_RECOVERY") {
        setSession(null);
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
        auth,
        login,
        signup,
        logout,

        passwordReset,
        updatePassword,
        session,
        user,
      }}
    >
      {children}
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

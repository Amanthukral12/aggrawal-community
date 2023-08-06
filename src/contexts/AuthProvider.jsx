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

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (e, session) => {
      if (e === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
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

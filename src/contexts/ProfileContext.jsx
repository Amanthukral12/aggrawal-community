import { createContext, useContext, useEffect, useState } from "react";

import propTypes from "prop-types";
import { UserAuth } from "./AuthProvider";
import supabase from "../supabaseClient";
supabase;

const ProfileContext = createContext();

const getAllProfiles = async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (data) {
    return data;
  } else {
    console.log(error);
  }
};

const ProfileProvider = ({ children }) => {
  const { session } = UserAuth();

  const [currentProfile, setCurrentProfile] = useState({});

  const getProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "first_name, last_name, phone_number, address, profile_photo, age, gender, id"
      )
      .eq("id", session.user.id)
      .single();

    if (data) {
      setCurrentProfile(data);
      return data;
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ getProfile, currentProfile, setCurrentProfile, getAllProfiles }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

export const UseProfile = () => {
  return useContext(ProfileContext);
};

ProfileProvider.propTypes = {
  children: propTypes.node,
};

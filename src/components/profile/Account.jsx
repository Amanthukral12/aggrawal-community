import { useState, useEffect } from "react";
import { UserAuth } from "../../contexts/AuthProvider";
import supabase from "../../supabaseClient";
import { db } from "../../firebase";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  deleteObject,
} from "firebase/storage";
import { UseProfile } from "../../contexts/ProfileContext";
import "./styles.css";
const Account = () => {
  const [loading, setLoading] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profile_photo, setProfilePhoto] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [file, setFile] = useState(null);

  const { session } = UserAuth();

  const { getProfile, setCurrentProfile, currentProfile } = UseProfile();

  const handleProfile = async () => {
    const data = await getProfile();

    setLoading(true);
    if (data) {
      setCurrentProfile(data);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setPhoneNumber(data.phone_number);
      setAddress(data.address);
      setProfilePhoto(data.profile_photo);
      setAge(data.age);
      setGender(data.gender);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleProfile();
  }, []);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  const updateProfile = async (e) => {
    e.preventDefault();

    const { data } = await supabase
      .from("profiles")
      .select("profile_photo")
      .eq("id", currentProfile?.id);

    if (file) {
      if (data[0].profile_photo) {
        const photoURL = data[0].profile_photo;

        const fileRef = ref(db, photoURL);

        await deleteObject(fileRef);
      }
      const storageRef = ref(db, `profilePictures/${file.name}${Date.now()}`);
      await uploadBytes(storageRef, file);

      var fileURL = await getDownloadURL(storageRef);

      setProfilePhoto(fileURL);
    }

    setLoading(true);

    const updates = {
      id: session.user.id,
      first_name,
      last_name,
      phone_number,
      address,
      profile_photo: fileURL,
      age,
      gender,
      email: session.user.email,
    };

    let { error } = await supabase.from("profiles").upsert(updates);
    if (error) {
      alert(error.message);
    }
    setLoading(false);
    getProfile();
  };

  return (
    <>
      <p className="heading">Update Profile</p>
      <section className="profileDetails">
        {profile_photo && (
          <img
            src={profile_photo}
            className="userProfilePhoto"
            alt="User Profile Photo"
          />
        )}

        <h3 className="userDetails">
          {first_name} {last_name}
        </h3>
        <p className="userDetails">{session.user.email}</p>
        <p className="userDetails">{address}</p>
        <p className="userDetails">{phone_number}</p>
        <p className="userDetails">{gender}</p>
        <p className="userDetails">{age}</p>
      </section>
      <form onSubmit={updateProfile} className="profileForm">
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          className="input"
          placeholder="First Name"
        />
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          className="input"
          placeholder="Last Name"
        />
        <input
          type="text"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input"
          placeholder="Phone Number"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input"
          placeholder="Address"
        />
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="input"
          placeholder="Age"
        />
        <select
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          className="input"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="file" onChange={handleFileChange} className="fileInput" />
        <button type="submit" disabled={loading} className="submitButton">
          Update Profile
        </button>
      </form>
    </>
  );
};

export default Account;

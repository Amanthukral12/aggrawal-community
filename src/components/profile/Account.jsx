import { useState, useEffect } from "react";
import { UserAuth } from "../../contexts/AuthProvider";
import supabase from "../../supabaseClient";
import { db } from "../../firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { UseProfile } from "../../contexts/ProfileContext";

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

  const { getProfile, setCurrentProfile } = UseProfile();

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

    if (file) {
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
      <div>
        <div>
          <img src={profile_photo} height="200px" width="200px" alt="" />
        </div>
        <div>
          <h3>
            {first_name}
            {last_name}
          </h3>
          <p>{session.user.email}</p>
          <p>{address}</p>
          <p>{phone_number}</p>
          <p>{gender}</p>
          <p>{age}</p>
        </div>
      </div>
      <form onSubmit={updateProfile}>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select onChange={(e) => setGender(e.target.value)} value={gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Account;

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import supabase from "../../supabaseClient";
import { UseProfile } from "../../contexts/ProfileContext";
import Event from "./Event";

const Events = () => {
  const [events, setEvents] = useState(null);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [event_photo, setEventPhoto] = useState("");
  const [file, setFile] = useState(null);
  const [eventDate, setEventDate] = useState();
  const [eventTime, setEventTime] = useState();
  const [fetchError, setFetchError] = useState(null);
  const [formError, setFormError] = useState(null);

  const { currentProfile } = UseProfile();

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      setFetchError("Could not fetch posts");
      setEvents(null);
    }
    if (data) {
      setEvents(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !address || !eventDate || !eventTime) {
      setFormError("Please fill all the details");
      return;
    }

    if (file) {
      const storageRef = ref(db, `eventPictures/${file.name}${Date.now()}`);
      await uploadBytes(storageRef, file);

      var fileURL = await getDownloadURL(storageRef);

      setEventPhoto(fileURL);
    }

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          address,
          date: eventDate,
          time: eventTime,
          photo: fileURL,
          userID: currentProfile.id,
          posted_by: currentProfile.first_name + currentProfile.last_name,
        },
      ])
      .select();

    if (error) {
      setFormError("Error posting post please try again after sometime");
    }
    if (data) {
      setFormError(null);
      setTitle("");
      setAddress("");
      setEventDate(null);
      setEventTime(null);
    }
    fetchEvents();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input type="date" onChange={(e) => setEventDate(e.target.value)} />
        <input type="time" onChange={(e) => setEventTime(e.target.value)} />
        <input type="file" onChange={handleFileChange} />
        <button>Submit</button>
        {formError && <p>{formError}</p>}
      </form>
      {fetchError && <p>{fetchError}</p>}
      {events && (
        <div>
          {events.map((event) => (
            <Event key={event.id} event={event} fetchEvents={fetchEvents} />
          ))}
        </div>
      )}
    </>
  );
};

export default Events;

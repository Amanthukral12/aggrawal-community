import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import supabase from "../../supabaseClient";
import { UseProfile } from "../../contexts/ProfileContext";
import Event from "./Event";
import "./styles.css";

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

  const handleErrorMessage = () => {
    setTimeout(function () {
      setFormError("");
      setFetchError("");
    }, 3000);
  };

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });
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
          posted_by: currentProfile.first_name + " " + currentProfile.last_name,
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
      setEventDate("");
      setEventTime("");
    }
    fetchEvents();
  };

  return (
    <>
      <form className="eventsForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={title}
          className="input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Address"
          value={address}
          className="input"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="date"
          className="input"
          onChange={(e) => setEventDate(e.target.value)}
          value={eventDate}
        />
        <input
          type="time"
          className="input"
          onChange={(e) => setEventTime(e.target.value)}
          value={eventTime}
        />
        <input type="file" className="fileInput" onChange={handleFileChange} />
        <button className="submitButton">Submit</button>
        {formError && <p className="msg">{formError}</p>}
        {formError ? handleErrorMessage() : null}
      </form>
      {fetchError && <p className="msg">{fetchError}</p>}
      {fetchError ? handleErrorMessage() : null}
      {events && (
        <div className="eventDetailsRoot">
          {events.map((event) => (
            <Event key={event.id} event={event} fetchEvents={fetchEvents} />
          ))}
        </div>
      )}
    </>
  );
};

export default Events;

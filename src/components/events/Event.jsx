import propTypes from "prop-types";
import { UseProfile } from "../../contexts/ProfileContext";
import supabase from "../../supabaseClient";
import "./styles.css";
import { MdDelete } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTime } from "react-icons/bi";
import { db } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";
ref;
const Event = ({ event, fetchEvents }) => {
  const { currentProfile } = UseProfile();
  const deleteEvent = async (id) => {
    const { data } = await supabase
      .from("events")
      .select("photo")
      .eq("id", id)
      .eq("userID", currentProfile?.id);

    if (data[0].photo) {
      const photoURL = data[0].photo;

      const fileRef = ref(db, photoURL);

      await deleteObject(fileRef);
    }

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id)
      .eq("userID", currentProfile?.id);

    if (error) console.log(error);
    fetchEvents();
  };

  return (
    <>
      <section className="eventsHeader">
        <p>{event.posted_by}</p>
        {event.userID === currentProfile.id ? (
          <MdDelete onClick={() => deleteEvent(event.id)} />
        ) : null}
      </section>
      <section className="eventsMainDiv">
        <div className="eventsDetails">
          <div className="eventInfo">
            <p className="eventName">{event.title}</p>
            <p className="eventAddress">
              <FaLocationDot className="eventIcon" /> {event.address}
            </p>
            <p className="eventTime">
              <BiSolidTime /> {event.date} {event.time.slice(0, -3)}
            </p>
          </div>
          {event.photo && <img src={event.photo} className="photo" alt="" />}
        </div>
      </section>
    </>
  );
};

export default Event;

Event.propTypes = {
  event: propTypes.object,
  fetchEvents: propTypes.func,
};

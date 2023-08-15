import propTypes from "prop-types";
import { UseProfile } from "../../contexts/ProfileContext";
import supabase from "../../supabaseClient";
const Event = ({ event, fetchEvents }) => {
  const { currentProfile } = UseProfile();
  const deleteEvent = async (id) => {
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
      <div>
        <p>{event.posted_by}</p>
        {event.userID === currentProfile.id ? (
          <button onClick={() => deleteEvent(event.id)}>Delete</button>
        ) : null}
        <div>
          <img src={event.photo} alt="" />
          <div>
            <p>{event.title}</p>
            <p>{event.address}</p>
            <p>
              {event.date} {event.time}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;

Event.propTypes = {
  event: propTypes.object,
  fetchEvents: propTypes.func,
};

import propTypes from "prop-types";
import Fade from "react-reveal/Fade";
import "./styles.css";
const Member = ({ member }) => {
  return (
    <Fade bottom>
      <div className="userSection">
        {member.profile_photo && (
          <img
            src={member.profile_photo}
            className="profilePhoto"
            alt="User Photo"
          />
        )}
        <h4 className="userName">
          {member.first_name} {member.last_name}
        </h4>
        <p>
          {member.age}, {member.gender}
        </p>
        <p className="address">{member.address}</p>
        <p>
          {member.phone_number}, {member.email}
        </p>
      </div>
    </Fade>
  );
};

export default Member;

Member.propTypes = {
  member: propTypes.object,
};

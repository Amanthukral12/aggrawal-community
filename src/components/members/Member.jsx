import propTypes from "prop-types";
const Member = ({ member }) => {
  return (
    <div>
      <img src={member.profile_photo} width="150px" height="150px" alt="" />
      <h4>
        {member.first_name} {member.last_name}
      </h4>
      <p>
        {member.age}, {member.gender}
      </p>
      <p>{member.address}</p>
      <p>
        {member.phone_number}, {member.email}
      </p>
    </div>
  );
};

export default Member;

Member.propTypes = {
  member: propTypes.object,
};

import { useEffect, useState } from "react";
import { UseProfile } from "../../contexts/ProfileContext";
import Member from "./Member";
import "./styles.css";
const MembersList = () => {
  const { getAllProfiles } = UseProfile();
  const [members, setMembers] = useState([]);

  const handleAllProfiles = async () => {
    const data = await getAllProfiles();

    if (data) {
      setMembers(data);
    }
  };

  useEffect(() => {
    handleAllProfiles();
  }, []);

  return (
    <div className="membersMainDiv">
      <div className="heading">Members</div>
      {members.map((member) => {
        return <Member key={member.id} member={member}></Member>;
      })}
    </div>
  );
};

export default MembersList;

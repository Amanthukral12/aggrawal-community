import { useEffect, useState } from "react";
import { UseProfile } from "../../contexts/ProfileContext";
import Member from "./Member";

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
    <div>
      <div>Members</div>
      {members.map((member) => {
        return <Member key={member.id} member={member}></Member>;
      })}
    </div>
  );
};

export default MembersList;

import { Link } from "react-router-dom";
import "./styles.css";
import { HiUserGroup } from "react-icons/hi";
import { BsCalendarEventFill } from "react-icons/bs";
import { GiBigDiamondRing } from "react-icons/gi";

const Home = () => {
  return (
    <div className="mainDiv">
      <Link to={"/members"} className="section">
        <HiUserGroup className="icons" />
        <h2>Memebers</h2>
      </Link>
      <Link to={"/events"} className="section">
        <BsCalendarEventFill className="icons" />
        <h2>Events</h2>
      </Link>
      <Link to={"/posts"} className="section">
        <GiBigDiamondRing className="icons" />
        <h2>Rishtas</h2>
      </Link>
    </div>
  );
};

export default Home;

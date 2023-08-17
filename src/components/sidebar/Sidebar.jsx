import propTypes from "prop-types";
import "./styles.css";
import { NavLink } from "react-router-dom";
const Sidebar = ({ children, shown, close }) => {
  return shown ? (
    <div
      className="sidebar-backdrop"
      onClick={() => {
        close();
      }}
    >
      <div
        className="sidebar-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "notSelected")}
          onClick={() => {
            close();
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/members"
          className={({ isActive }) => (isActive ? "active" : "notSelected")}
          onClick={() => {
            close();
          }}
        >
          Members
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "active" : "notSelected")}
          onClick={() => {
            close();
          }}
        >
          Posts
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) => (isActive ? "active" : "notSelected")}
          onClick={() => {
            close();
          }}
        >
          Events
        </NavLink>
      </div>
    </div>
  ) : null;
};

export default Sidebar;

Sidebar.propTypes = {
  children: propTypes.node,
  shown: propTypes.bool,
  close: propTypes.func,
};

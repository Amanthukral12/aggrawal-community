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
        <NavLink
          to="/members"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          onClick={() => {
            close();
          }}
        >
          Members
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          onClick={() => {
            close();
          }}
        >
          Posts
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          onClick={() => {
            close();
          }}
        >
          Events
        </NavLink>
        {children}
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

import { UseProfile } from "../../contexts/ProfileContext";
import "./styles.css";
import propTypes from "prop-types";
const Modal = ({ children, shown, close }) => {
  const { currentProfile } = UseProfile();
  return shown ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        close();
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={currentProfile.profile_photo}
          className="profilePicture"
          alt=""
        />
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;

Modal.propTypes = {
  children: propTypes.node,
  shown: propTypes.bool,
  close: propTypes.func,
};

import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./LogoutModal.css";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  property: string;
}

export const LogoutModal = ({ open, onClose, property }: LogoutModalProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navigateTo = () => {
    if (property === "Players") navigate("/players");
    if (property === "Scouts") navigate("/scouts");
  };

  const handleLogout = () => {
    logout();
    navigate("/home-page");
  };

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <button onClick={onClose} className="close-btn">
          ×
        </button>

        <h2 className="title">Logout</h2>

        <button onClick={navigateTo} className="property-btn">
          {property}
        </button>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

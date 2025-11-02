import { AuthModalProps } from "../../api/apiInterface";
import { ReturnIcon } from "../../icons/ReturnIcon";
import "./AuthModal.css";

export const AuthModal = ({ onClose, toLogin, toRegister }: AuthModalProps) => {
  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div>
          <button onClick={toLogin} className="login-button">
            Login
          </button>
        </div>
        <div>
          <button onClick={toRegister} className="register-button">
            Register
          </button>
        </div>
        <div className="leave-button" onClick={onClose}>
          <ReturnIcon />
        </div>
      </div>
    </div>
  );
};

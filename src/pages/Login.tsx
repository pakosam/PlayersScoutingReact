import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import { useAuth } from "../components/AuthContext";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginButton = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await authRepository.login({ email, password });
      login();
      navigate("/players");
    } catch (error) {
      console.error("Error registration:", error);
    }
  };

  return (
    <div className="login">
      <div className="header">
        <h4>Login</h4>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={loginButton}>
          <div className="form-section">
            <label>E-mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button-form">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

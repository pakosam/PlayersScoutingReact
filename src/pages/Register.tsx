import { useState } from "react";
import { IRegister } from "../api/apiInterface";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { authRepository } from "../repositories/authRepository";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<IRegister>({
    name: "",
    surname: "",
    birthdate: "",
    birthplace: "",
    email: "",
    password: "",
  });

  const handleChange = (field: keyof IRegister, value: string | number) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const registerButton = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await authRepository.register(registerData);
      navigate("/home-page");
    } catch (error) {
      console.error("Error registration:", error);
    }
  };
  return (
    <div className="register">
      <div className="header">
        <h4>Registration</h4>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={registerButton}>
          <div className="form-section">
            <label>Name</label>
            <input
              type="text"
              value={registerData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />

            <label>Surname</label>
            <input
              type="text"
              value={registerData.surname}
              onChange={(e) => handleChange("surname", e.target.value)}
              required
            />

            <label>Birthdate</label>
            <input
              type="date"
              value={registerData.birthdate}
              onChange={(e) => handleChange("birthdate", e.target.value)}
              required
            />

            <label>Birthplace</label>
            <input
              type="text"
              value={registerData.birthplace}
              onChange={(e) => handleChange("birthplace", e.target.value)}
              required
            />

            <label>E-mail</label>
            <input
              type="text"
              value={registerData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="text"
              value={registerData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button-form">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

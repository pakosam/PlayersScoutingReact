import { IAddScout } from "../api/apiInterface";
import { scoutRepository } from "../repositories/scoutRepository";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import "./AddScout.css"

export const AddScout = () => {
  const [scoutData, setScoutData] = useState<IAddScout>({
    name: "",
    surname: "",
    birthdate: "",
    birthplace: "",
    email: "",
    password: "",
    playerFullName: "",
  });

  const navigate = useNavigate()

  const handleChange = (field: keyof IAddScout, value: string | number) => {
      setScoutData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const addScoutButton = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await scoutRepository.create(scoutData);
      navigate("/scouts");
    } catch (error) {
      console.error("Error creating scout:", error);
    }
  };

  return (
    <div className="add-scout">
      <div className="header">
        <h4>New scout</h4>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={addScoutButton}>
          <div className="form-section">
            <label>Name</label>
            <input
              type="text"
              value={scoutData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />

            <label>Surname</label>
            <input
              type="text"
              value={scoutData.surname}
              onChange={(e) => handleChange("surname", e.target.value)}
              required
            />

            <label>Birthdate</label>
            <input
              type="date"
              value={scoutData.birthdate}
              onChange={(e) => handleChange("birthdate", e.target.value)}
              required
            />

            <label>Birthplace</label>
            <input
              type="text"
              value={scoutData.birthplace}
              onChange={(e) => handleChange("birthplace", e.target.value)}
              required
            />

            <label>E-mail</label>
            <input
              type="text"
              value={scoutData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="text"
              value={scoutData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />

            <label>Player full name</label>
            <input
              type="text"
              value={scoutData.playerFullName}
              onChange={(e) => handleChange("playerFullName", e.target.value)}
            />
          </div>

          <button type="submit" className="add-scout-button">
            Add scout
          </button>
        </form>
      </div>
    </div>
  );
};

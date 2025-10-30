import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { scoutRepository } from "../repositories/scoutRepository";
import { IUpdateScout } from "../api/apiInterface";
import "./UpdateScout.css"

export const UpdateScout = () => {
  const navigate = useNavigate();

  const { scoutId } = useParams();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [playerFullName, setPlayerFullName] = useState("");

  useEffect(() => {
    const fetchScout = async () => {
      if (!scoutId) return;
      try {
        const data = await scoutRepository.getSingleScout(scoutId);

        setId(data.id);
        setName(data.name);
        setSurname(data.surname);
        setBirthdate(data.birthdate);
        setBirthplace(data.birthplace);
        setEmail(data.email);
        setPassword(data.password);
        setPlayerFullName(data.playerFullName);
        console.log(data)
      } catch (err) {
        console.error("Failed to load parking", err);
      }
    };

    fetchScout();
  }, [scoutId]);

  const submitBtn = async (event: FormEvent) => {
    event.preventDefault();

    const updatedScout: IUpdateScout = {
      id,
      name,
      surname,
      birthdate,
      birthplace,
      email,
      password,
      playerFullName,
    };

    try {
      await scoutRepository.update(updatedScout);
      navigate(`/scouts`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="update-scout">
      <div className="header">
        <h4>Update scout</h4>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={submitBtn}>
          <div className="form-section">
            <label>ID</label>
            <input type="number" value={id} readOnly />
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Surname</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />

            <label>Birthdate</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />

            <label>Birthplace</label>
            <input
              type="text"
              value={birthplace}
              onChange={(e) => setBirthplace(e.target.value)}
              required
            />

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

            <label>Player full name</label>
            <input
              type="text"
              value={playerFullName}
              onChange={(e) => setPlayerFullName(e.target.value)}
            />
          </div>

          <button type="submit" className="update-scout-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

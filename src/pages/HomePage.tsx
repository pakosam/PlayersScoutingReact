import { OptionIcon } from "../icons/OptionIcon";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <div
      id="main-menu"
      style={{
        backgroundImage:
          'url("assets/izuddin-helmi-adnan-ndxwXAt0jpg-unsplash.jpg")',
      }}
    >
      <div className="header-and-options-button">
        <h1>Players Scouting</h1>
        <OptionIcon />
      </div>

      <div className="welcome-text">
        <p>
          Welcome to Players Scouting Discover. <br />
          Evaluate. Recruit. <br />
          Find the next football star with powerful tools built for scouts,
          coaches, and clubs. <br />
          From in-depth player analysis to global talent discovery — we make
          scouting smarter, faster, and more connected. <br />
          Start your journey today. <br />
        </p>
      </div>
    </div>
  );
};

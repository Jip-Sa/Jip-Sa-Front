import React from "react";
import { Link } from "react-router-dom";

const SplashPage = () => {
  return (
    <div>
      <h1>Welcome to Splash Page</h1>
      <p>Click the button to go to the Main Page.</p>
      <Link to="/main">
        <button>Go to Main Page</button>
      </Link>
    </div>
  );
};

export default SplashPage;

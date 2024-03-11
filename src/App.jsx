import React, { useState, useEffect } from "react";
import "./App.css";
import Image from "./Image";
import Kanji from "./Kanji";
import UserInput from "./UserInput";
import Score from "./Score";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [randomCharacter, setRandomCharacter] = useState(null);
  const [score, setScore] = useState(0);

  const handleLogin = (event) => {
    event.preventDefault();

    // implement authentication logic later
  
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  const fetchRandomCharacter = async () => {
    try {
      const response = await fetch("http://localhost:3001/random");
      const data = await response.json();
      setRandomCharacter(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderLoginForm = () => {
    return (
      <div>
        <h2>Login Form</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Username:
              <input type="text" style={{ marginLeft: '5px' }} />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Password:
              <input type="password" style={{ marginLeft: '3px' }} />
            </label>
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>Login</button>
        </form>
      </div>
    );
  };  

  const renderMainContent = () => {
    if (!randomCharacter) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <button onClick={handleLogout} style={{ marginBottom: '10px' }}>Logout</button>
        <Image path="fuji.jpeg" />
        <Kanji unicodeValue={randomCharacter.japanese} />
        {randomCharacter.english && <div>{randomCharacter.english}</div>}
        <div className="input">
          <UserInput
            randomCharacter={randomCharacter}
            updateScore={handleScoreUpdate}
            fetchRandomCharacter={fetchRandomCharacter}
          />
        </div>
        <Score score={score} />
      </>
    );
  };

  useEffect(() => {
    if (authenticated) {
      fetchRandomCharacter();
    }
  }, [authenticated]); // include authenticated state as a dependency

  return (
    <div className="App">
      {authenticated ? renderMainContent() : renderLoginForm()}
    </div>
  );
}

export default App;
import React, { useState } from "react";
import "./App.css";
import Image from "./Image";
import Kanji from "./Kanji";
import UserInput from "./UserInput";
import Score from "./Score";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [randomCharacter, setRandomCharacter] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      console.log(data);
      if (data.message === "Authentication successful") {
        setAuthenticated(true);
        setHighScore(data.highScore)
        fetchRandomCharacter();
        setUsername("");
        setPassword("");
      } else {
        alert("Incorrect login!");
        console.error("Authentication failed:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    if (score > highScore) {
      try {
        await fetch("http://localhost:3001/updateHighScore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, newHighScore: score }),
        });
      } catch (error) {
        console.error("Error updating high score:", error);
      }
    }
    setAuthenticated(false);
  };

  const handleRegister = async () => {
    if(!username.trim() || !password.trim()) {
      alert("Username and password must be filled out.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Registration successful. You can now login.");
        setUsername("");
        setPassword("");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

  return (
    <div className="App">
      {authenticated ? (
        <div>
          <button onClick={handleLogout} style={{ marginBottom: "10px" }}>Logout</button>
          <Image path="fuji.jpeg" />
          <Kanji unicodeValue={randomCharacter?.japanese} />
          {randomCharacter?.english && <div>{randomCharacter.english}</div>}
          <div className="input">
            <UserInput
              randomCharacter={randomCharacter}
              updateScore={handleScoreUpdate}
              fetchRandomCharacter={fetchRandomCharacter}
            />
          </div>
          <Score score={score} highScore={highScore}/>
        </div>
      ) : (
        <div>
          <h2>Login Form</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ marginLeft: "5px" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginLeft: "3px" }}
                />
              </label>
            </div>
            <button type="submit" style={{ marginRight: "5px" }}>
              Login
            </button>
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
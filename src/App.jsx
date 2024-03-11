import React, { useState } from "react";
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      } else {
        console.error("Authentication failed:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("Authenticated:", authenticated);

  return (
    <div className="App">
      {authenticated ? (
        <div>
          <h2>Authenticated Content</h2>
          <button onClick={() => setAuthenticated(false)}>Logout</button>
          {/* Include authenticated content here */}
        </div>
      ) : (
        <div>
          <h2>Login Form</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '10px' }}>
              <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginLeft: '5px' }} />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginLeft: '3px' }} />
              </label>
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
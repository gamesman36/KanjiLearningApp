import express from "express";
import cors from "cors";
import mysql from "mysql";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;
const saltRounds = 10;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/random", (req, res) => {
  const query = "SELECT * FROM characters ORDER BY RAND() LIMIT 1";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing database query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const randomCharacter = result[0];
    res.json(randomCharacter);
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Received username:", username);
  console.log("Received password:", password);

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error executing database query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (result.length === 0) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const dbUser = result[0];
    console.log("High score: ", dbUser.highscore);

    bcrypt.compare(password, dbUser.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (isMatch) {
        res.json({ message: "Authentication successful", highScore: dbUser.highscore });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    });
  });
});


app.post("/updateHighScore", (req, res) => {
  const { username, newHighScore } = req.body;
  const updateQuery = "UPDATE users SET highscore = ? WHERE username = ?";
  db.query(updateQuery, [newHighScore, username], (err, result) => {
    if (err) {
      console.error("Error updating high score:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ message: "High score updated successfully" });
  });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error executing database query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (result.length > 0) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log("Error hashing password:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        const insertQuery = "INSERT INTO users (username, password, highscore) VALUES (?, ?, ?)";
        db.query(insertQuery, [username, hash, 0], (err, result) => {
          if (err) {
            console.error("Error executing database query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }

          res.json({ message: "User registered successfully" });
        });
      }
    });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
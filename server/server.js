import express from "express";
import cors from "cors";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

const app = express();
app.use(cors());

const port = 3001;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
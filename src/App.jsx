import React, { useEffect, useState } from "react";
import "./App.css";
import Image from "./Image";
import Kanji from "./Kanji";
import UserInput from "./UserInput";
import Score from "./Score";

function App() {
  const [randomCharacter, setRandomCharacter] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchRandomCharacter();
  }, [score]);

  const fetchRandomCharacter = async () => {
    try {
      const response = await fetch("http://localhost:3001/random");
      const data = await response.json();
      setRandomCharacter(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  return randomCharacter && (
    <>
      <Image path="fuji.jpeg" />
      <Kanji unicodeValue={randomCharacter.japanese} />
      {randomCharacter.english && <div>{randomCharacter.english}</div>}
      <div className="input">
        <UserInput
          randomCharacter={randomCharacter}
          updateScore={updateScore}
          fetchRandomCharacter={fetchRandomCharacter}
        />
      </div>
      <Score score={score} />
    </>
  );
}

export default App;
import "./App.css";
import { useEffect, useState } from "react";
import Kanji from "./Kanji";
import UserInput from "./UserInput";

function App() {
  const [randomCharacter, setRandomCharacter] = useState(null);

  useEffect(() => {
    const fetchRandomCharacter = async () => {
      try {
        const response = await fetch("http://localhost:3001/random");
        const data = await response.json();
        setRandomCharacter(data);
      } catch(error) {
        console.error("Error:", error);
      }
    };

    fetchRandomCharacter();
  }, []);

  return randomCharacter && (
    <>
      <Kanji unicodeValue={randomCharacter.japanese} />
      {randomCharacter.english && <div>{randomCharacter.english}</div>}
      <div className="input"><UserInput randomCharacter={randomCharacter}/></div>
    </>
  );
  
}

export default App;
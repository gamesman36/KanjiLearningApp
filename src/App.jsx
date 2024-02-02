import "./App.css";
import Kanji from "./Kanji";
import UserInput from "./UserInput";
import characters from "./characters.json";

console.log(characters);
let randomChoice = Math.floor(Math.random() * characters.length);
let randomCharacter = characters[randomChoice].japanese;

function App() {
  return (
    <div>
      <div className="kanji">
        <Kanji unicodeValue={randomCharacter} />
      </div>
      <UserInput />
    </div>
  )
}

export default App;
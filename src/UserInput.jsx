import { useRef, useState, useEffect } from "react";

function UserInput({ randomCharacter, updateScore, fetchRandomCharacter }) {
    const onyomiRef = useRef();
    const kunyomiRef = useRef();
    const [score, setScore] = useState(0);

    useEffect(() => {
        updateScore(score);
    }, [score, updateScore]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const onyomi = onyomiRef.current.value.toLowerCase();
        const kunyomi = kunyomiRef.current.value.toLowerCase();

        processAnswers(onyomi, kunyomi);

        onyomiRef.current.value = "";
        kunyomiRef.current.value = "";
    }

    const processAnswers = (onyomi, kunyomi) => {
        let onyomiStatus = 
            randomCharacter.onyomi === onyomi
            ? "correct" 
            : "incorrect";

        let kunyomiStatus = 
            randomCharacter.kunyomi === kunyomi
            ? "correct" 
            : "incorrect";

        if(onyomiStatus === "correct")
            setScore((prevScore) => prevScore + 1);
        if(kunyomiStatus === "correct")
            setScore((prevScore) => prevScore + 1);

        alert(`Onyomi: ${onyomiStatus} Kunyomi: ${kunyomiStatus}`);
        fetchRandomCharacter();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <input ref={onyomiRef} type="text" placeholder="Onyomi" /><br />
                    <input ref={kunyomiRef} type="text" placeholder="Kunyomi" /><br />
                <button className="btn" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserInput;
import { useRef } from "react";

function UserInput({randomCharacter}) {
    const onyomiRef = useRef();
    const kunyomiRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const onyomi = onyomiRef.current.value;
        const kunyomi = kunyomiRef.current.value;

        processAnswers(onyomi, kunyomi);

        onyomiRef.current.value = "";
        kunyomiRef.current.value = "";
    }

    const processAnswers = (onyomi, kunyomi) => {
        let onyomiStatus = 
            randomCharacter.onyomi === onyomi.toLowerCase() 
            ? "correct" 
            : "incorrect";

        let kunyomiStatus = 
            randomCharacter.kunyomi === kunyomi.toLowerCase() 
            ? "correct" 
            : "incorrect";

        alert(`Onyomi: ${onyomiStatus} Kunyomi: ${kunyomiStatus}`);
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
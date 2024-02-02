import { useRef } from "react";

function UserInput() {
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const answer = inputRef.current.value;
        alert(`${answer}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={inputRef} type="text" placeholder="answer" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserInput;
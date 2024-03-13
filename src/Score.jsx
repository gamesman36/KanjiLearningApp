function Score({ score, highScore }) {
    return (
        <div className="score">
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
        </div>
    );
}

export default Score;
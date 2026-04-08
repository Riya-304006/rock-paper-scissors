import { useState } from 'react'
import './App.css'

function App() {

  let [userScoreCount,setUserScoreCount] = useState(0);
  let [computerScoreCount,setComputerScoreCount] = useState(0);

  
  let [rounds, setRounds] = useState(0);
  let [result, setResult] = useState("");
  let [history, setHistory] = useState([]);
  let [streak, setStreak] = useState(0);

  function handleClick(_userMove){

    return () => {

      let _computerMove = "";
      let _userScore = userScoreCount;
      let _computerScore = computerScoreCount;

      let randomNum = Math.random();
      
      if(randomNum < 0.34){
        _computerMove = "Rock";
      }else if(randomNum < 0.67){
        _computerMove = "Paper";
      }else{
        _computerMove = "Scissor";
      }

      let currentResult = "";

 
      if(_userMove === _computerMove){
        currentResult = "Draw 🤝";
        setStreak(0); 
      }
      else if(
        (_userMove === "Rock" && _computerMove === "Scissor") || 
        (_userMove === "Paper" && _computerMove === "Rock") ||
        (_userMove === "Scissor" && _computerMove === "Paper")
      ){
        _userScore++;
        currentResult = "You Win 🎉";
        setStreak(prev => prev + 1);
      }else{
        _computerScore++;
        currentResult = "Computer Wins 😢";
        setStreak(0);
      }

      setResult(currentResult);

      setUserScoreCount(_userScore);
      setComputerScoreCount(_computerScore);

      setRounds(prev => prev + 1);

      setHistory(prev => [
        ...prev,
        `You: ${_userMove} | Computer: ${_computerMove} → ${currentResult}`
      ]);
    }
  }

  function handleReset(){
    setUserScoreCount(0);
    setComputerScoreCount(0);
    setRounds(0);
    setResult("");
    setHistory([]);
    setStreak(0);
  }

  return (
  <div className="container">
    <h1 className="title">🎮 Rock Paper Scissors</h1>

    <div className="score-board">
      <div className="score">
        <h3>Computer</h3>
        <p>{computerScoreCount}</p>
      </div>
      <div className="score">
        <h3>User</h3>
        <p>{userScoreCount}</p>
      </div>
    </div>

    <div className="info">
      <p>Rounds: {rounds}</p>
      <p>🔥 Streak: {streak}</p>
    </div>

    <h2 className="result">{result}</h2>

    <div className="buttons">
      <button onClick={handleClick("Rock")}>🪨</button>
      <button onClick={handleClick("Paper")}>📃</button>
      <button onClick={handleClick("Scissor")}>✂️</button>
    </div>

    <button className="reset" onClick={handleReset}>
      🔄 Reset Game
    </button>

    <div className="history">
      <h3>Move History</h3>
      <ul>
        {history.slice(-5).reverse().map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
)
}

export default App
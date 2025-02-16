import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";

import "./App.css";

function App() {
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [currentTime, setCurrentTime] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  const workDuration = 25 * 60; // 25 minutes in seconds
  const breakDuration = 5 * 60; // 5 minutes in seconds

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  };

  // Start the timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Stop the timer
  const stopTimer = () => {
    setIsRunning(false);
  };

  // Switch between work and break
  const switchSession = () => {
    if (isWorkTime) {
      setCurrentTime(breakDuration);
    } else {
      setCurrentTime(workDuration);
    }
    setIsWorkTime(!isWorkTime);
  };

  // Effect to handle countdown
  useEffect(() => {
    let timer;

    if (isRunning && currentTime > 0) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (currentTime === 0) {
      clearInterval(timer);
      switchSession();
      alert(
        isWorkTime ? "Time's up! Take a break!" : "Break's over! Back to work!"
      );
    }

    return () => clearInterval(timer); // Cleanup on unmount or when timer stops
  }, [isRunning, currentTime, isWorkTime]);

  return (
    <div className="container">
      <Navbar />
      <h1>100doro</h1>
      <div className="timer-display">
        <h2>{isWorkTime ? "Work Time" : "Break Time"}</h2>
        <div className="timer">{formatTime(currentTime)}</div>
      </div>
      <div className="buttons">
        {isRunning ? (
          <button onClick={stopTimer} className="button stop">
            Stop
          </button>
        ) : (
          <button onClick={startTimer} className="button start">
            Start
          </button>
        )}
        <button onClick={switchSession} className="button switch">
          {isWorkTime ? "Start Break" : "Back to Work"}
        </button>
      </div>
    </div>
  );
}

export default App;

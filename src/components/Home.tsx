import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { ProgressBar } from "./ProgressBar";

import styles from "./home.module.css";

export const Home = ({
  focusTime,
  breakTime,
}: {
  focusTime: number;
  breakTime: number;
}) => {
  const [percentage, setPercentage] = useState(0); // To store the percentage for the progress bar
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [currentTime, setCurrentTime] = useState(focusTime * 60); // Initially 25 minutes for work
  const [isRunning, setIsRunning] = useState(false);
  const workDuration = focusTime * 60; // 25 minutes in seconds TODO update
  const breakDuration = breakTime * 60; // 5 minutes in seconds TODO update

  // Effect to handle countdown
  useEffect(() => {
    let timer: number | undefined;

    if (isRunning && currentTime > 0) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (currentTime === 0) {
      clearInterval(timer);
      //TODO add notification/Alert
      // switchSession();
      // alert(
      //   isWorkTime ? "Time's up! Take a break!" : "Break's over! Back to work!"
      // );
    }

    return () => clearInterval(timer); // Cleanup on unmount or when timer stops
  }, [isRunning, currentTime, isWorkTime]);

  // Update the progress bar percentage
  useEffect(() => {
    const sessionTime = isWorkTime ? workDuration : breakDuration;

    // Calculate percentage based on the current session time
    setPercentage(((sessionTime - currentTime) / sessionTime) * 100);
  }, [currentTime, isWorkTime]); // Update whenever currentTime or isWorkTime changes
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
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
  return (
    <>
      <div className={styles.container}>
        <h1>{isWorkTime ? "Focus Time" : "Break Time"}</h1>
        <ProgressBar
          timer={percentage.toFixed(0)}
          label={`${percentage.toFixed(0)}%`}
        />
        <div className={styles.timer}>{formatTime(currentTime)}</div>
      </div>
      <div className="buttons">
        {isRunning ? (
          <Button onClick={stopTimer} className={styles.button} color="red">
            Stop
          </Button>
        ) : (
          <Button onClick={startTimer} className={styles.button} color="green">
            Start
          </Button>
        )}
        <Button onClick={switchSession} className={styles.button}>
          {isWorkTime ? "Start Break" : "Back to Work"}
        </Button>
      </div>
    </>
  );
};

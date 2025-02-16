import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { MantineProvider } from "@mantine/core";
import { AppShell, Burger } from "@mantine/core";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import "./App.css";
import "@mantine/core/styles.css";
import { ProgressBar } from "./components/ProgressBar";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [percentage, setPercentage] = useState(0); // To store the percentage for the progress bar
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [currentTime, setCurrentTime] = useState(25 * 60); // Initially 25 minutes for work
  const [isRunning, setIsRunning] = useState(false);

  const workDuration = 25 * 60; // 25 minutes in seconds TODO update
  const breakDuration = 0.25 * 60; // 5 minutes in seconds TODO update

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
  return (
    <MantineProvider>
      <AppShell
        header={{ height: 120 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Navbar p="md">
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <h1 className="header">100doro</h1>
        </AppShell.Header>
        <AppShell.Main>
          <div className="timer-display">
            <h2>{isWorkTime ? "Focus Time" : "Break Time"}</h2>
            <ProgressBar
              timer={percentage.toFixed(0)}
              label={`${percentage.toFixed(0)}%`}
            />
            <div className="timer">{formatTime(currentTime)}</div>
          </div>
          <div className="buttons">
            {isRunning ? (
              <Button onClick={stopTimer} className="button stop" color="red">
                Stop
              </Button>
            ) : (
              <Button
                onClick={startTimer}
                className="button start"
                color="green"
              >
                Start
              </Button>
            )}
            <Button onClick={switchSession} className="button switch">
              {isWorkTime ? "Start Break" : "Back to Work"}
            </Button>
          </div>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

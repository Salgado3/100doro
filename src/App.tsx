import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { MantineProvider, Title } from "@mantine/core";
import { AppShell, Burger } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import { useDisclosure, useHeadroom, useMediaQuery } from "@mantine/hooks";
import { Home } from "./components/Home";
import { Settings } from "./components/Settings";
import { CommunityStats } from "./components/CommunityStats";

import "./App.css";
import "@mantine/core/styles.css";

function App() {
  const pinned = useHeadroom({ fixedAt: 40 });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [opened, { toggle }] = useDisclosure();
  const [activeComponent, setActiveComponent] = useState("home"); // default component to show
  const [loading, setLoading] = useState(true);
  const [submittedValues, setSubmittedValues] = useState<{
    focusTime: number;
    breakTime: number;
  } | null>(null);

  // Fetch the settings from localStorage when the component mounts
  useEffect(() => {
    const userSettings = window.localStorage.getItem("timeValues");

    if (userSettings) {
      setSubmittedValues(JSON.parse(userSettings)); // Parse and set the values
    }
    setLoading(false); // Data is loaded, stop loading
  }, []);

  useEffect(() => {
    if (isMobile) {
      toggle();
    }
  }, [activeComponent]);
  
  if (loading) {
    return (
      <MantineProvider defaultColorScheme="dark">
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </MantineProvider>
    );
  }

  return (
    <MantineProvider defaultColorScheme="dark">
      <AppShell
        header={{ height: 120, collapsed: !pinned, offset: false }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="xxs"
      >
        <AppShell.Navbar p="md" withBorder={false}>
          <Navbar setActiveComponent={setActiveComponent} />
        </AppShell.Navbar>
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title className="header">100doro</Title>
        </AppShell.Header>
        <AppShell.Main className="mainContainer">
          {activeComponent === "home" && (
            <Home
              focusTime={submittedValues?.focusTime || 25}
              breakTime={submittedValues?.breakTime || 10}
            />
          )}
          {activeComponent === "Community stats" && <CommunityStats />}
          {activeComponent === "settings" && (
            <Settings
              focusTime={submittedValues?.focusTime || 25}
              breakTime={submittedValues?.breakTime || 10}
              setSubmittedValues={setSubmittedValues}
            />
          )}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { MantineProvider } from "@mantine/core";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Home } from "./components/Home";

import "./App.css";
import "@mantine/core/styles.css";
import { Settings } from "./components/Settings";
import { CommunityStats } from "./components/CommunityStats";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [activeComponent, setActiveComponent] = useState("home"); // default component to show

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
        <AppShell.Navbar p="md" withBorder={false}>
          <Navbar setActiveComponent={setActiveComponent} />
        </AppShell.Navbar>
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <h1 className="header">100doro</h1>
        </AppShell.Header>
        <AppShell.Main>
          {activeComponent === "home" && <Home />}
          {activeComponent === "Community stats" && <CommunityStats />}
          {activeComponent === "settings" && <Settings />}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

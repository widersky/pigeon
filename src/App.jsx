import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import HoursCalcView from "./views/HoursCalc.view";
import '@mantine/core/styles.css';
import AppTopBar from "./components/AppTopBar";
import { Badge, NavLink, Stack } from "@mantine/core";
import { IconCalculator, IconRepeat, IconRobot } from "@tabler/icons-react";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="flex h-screen">
      <div className="w-[360px] border-r border-r-gray-950">
        <h1 className="pl-20 h-12 flex pt-3 font-bold">Pigeon</h1>

        {/* Nav */}
        <Stack p={8} gap={2}>
          <NavLink className="rounded" label="Kalkulator wynagrodzenia" leftSection={<IconCalculator size="1rem" stroke={1.5} />} active />
          <NavLink className="rounded" label="Symulator przyszłości" leftSection={<IconRobot size="1rem" stroke={1.5} />} rightSection={<Badge size="xs">Beta</Badge>} />
          <NavLink className="rounded" label="Regularne wydatki" leftSection={<IconRepeat size="1rem" stroke={1.5} />} />
        </Stack>
      </div>
      <div className="flex flex-col w-full">
        <AppTopBar />
        <HoursCalcView />
      </div>
    </div>
  );
}

export default App;

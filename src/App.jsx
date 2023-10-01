import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import '@mantine/core/styles.css';
import AppTopBar from "./components/AppTopBar";
import { Badge, NavLink, Stack } from "@mantine/core";
import { IconCalculator, IconCalendarRepeat, IconCoins, IconCrystalBall, IconMoneybag, IconRepeat, IconRobot } from "@tabler/icons-react";
import { Link, Route, Routes } from "react-router-dom";

// Views
import HoursCalcView from "./views/HoursCalc.view";
import RegularExpenses from "./views/RegularExpenses";

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
          <NavLink label="Zestawienia" disabled />
          <NavLink component={Link} to="/regular-incomes" className="rounded" label="Regularne dochody" leftSection={<IconMoneybag size="1rem" stroke={1.5} />} />
          <NavLink component={Link} to="/regular-expenses" className="rounded" label="Regularne wydatki" leftSection={<IconCoins size="1rem" stroke={1.5} />} />

          <NavLink label="Narzędzia" disabled />
          <NavLink component={Link} to="/" className="rounded" label="Kalkulator wynagrodzenia" leftSection={<IconCalendarRepeat size="1rem" stroke={1.5} />} active />
          <NavLink component={Link} className="rounded" label="Symulator przyszłości" leftSection={<IconCrystalBall size="1rem" stroke={1.5} />} rightSection={<Badge size="xs">Beta</Badge>} />
        </Stack>
      </div>
      <div className="flex flex-col w-full">
        <AppTopBar />
        <Routes>
          <Route path="/" element={<HoursCalcView />} />
          <Route path="/regular-expenses" element={<RegularExpenses />} />
       </Routes>
      </div>
    </div>
  );
}

export default App;

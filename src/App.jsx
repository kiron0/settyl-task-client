import { useEffect, useState } from "react";
import { createContext } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Navbar from "./Shared/Navbar/Navbar";

export const InitializeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };
  return (
    <InitializeContext.Provider value={{ handleThemeChange, theme }}>
      <div data-theme={theme && "night"} className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster />
      </div>
    </InitializeContext.Provider>
  );
}

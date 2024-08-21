import { useState } from "react";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "./store/themeSlice";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const dispatch = useDispatch();

  const changeThemeMode = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    dispatch(changeTheme(newThemeMode));
    setThemeMode(newThemeMode);
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.classList.remove("dark", "light");
    html.classList.add(themeMode);
  }, [themeMode]);
  return (
    <>
      <div className="w-full h-screen flex flex-col ">
        <Navbar changeTheme={changeThemeMode} />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;

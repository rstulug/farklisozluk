import { IconContext } from "react-icons";
import { useDarkMode } from "../hooks.js/useDarkMode";
import { FaRegMoon } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";

function DarkMode() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      onClick={toggleDarkMode}
      title={darkMode ? "Normal Görünüm" : "Koyu Görünüm"}
    >
      {darkMode ? (
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <FaRegLightbulb />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <FaRegMoon />
        </IconContext.Provider>
      )}
    </button>
  );
}

export default DarkMode;

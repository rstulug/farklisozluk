import { useEffect, useState } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return { darkMode, toggleDarkMode };
}

import { useEffect, useState } from "react";

/**
 * Função reponsável por alterar o tema do site
 * @returns 
 */
export default function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") === "dark"
      : false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="ml-2 mb-2 px-2 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}

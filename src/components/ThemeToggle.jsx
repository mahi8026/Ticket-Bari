
import React from "react";
import useTheme from "../hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="swap swap-rotate mr-4">
      
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <FiMoon className="swap-off w-6 h-6 text-gray-700 dark:text-gray-400" />
     <FiSun className="swap-on w-6 h-6 text-yellow-500" />
    </label>
  );
};

export default ThemeToggle;

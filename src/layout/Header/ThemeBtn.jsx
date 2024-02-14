import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useState, useEffect } from "react";

// FIXME THEME NOT WORKING
const ThemeBtn = () => {
  const [theme, setTheme] = useState(false); // Initialize with true for light theme

  useEffect(() => {
    // On component mount, check if there's a theme in local storage and set the theme accordingly
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme === "light");
    }
  }, [theme]);

  const onThemeChange = () => {
    const newTheme = !theme;
    if (newTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setTheme(newTheme);
  };

  return (
    <button
      onClick={onThemeChange}
      className="inline-block px-4 py-2 rounded-xl"
    >
      {theme ? <MdDarkMode size={25} /> : <MdOutlineLightMode size={25} />}
    </button>
  );
};

export default ThemeBtn;

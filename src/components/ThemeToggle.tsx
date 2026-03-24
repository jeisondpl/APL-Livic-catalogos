"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Inicializar desde localStorage — sin preferencia del sistema, default siempre claro
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-surface-200 border border-surface-300 text-foreground hover:bg-surface-300 transition-all active:scale-90"
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun className="w-5 h-5 text-livic-yellow" />
      ) : (
        <Moon className="w-5 h-5 text-livic-purple" />
      )}
    </button>
  );
}

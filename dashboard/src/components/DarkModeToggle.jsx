import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import "./DarkModeToggle.css";

const DarkModeToggle = () => {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

      document.body.classList.add("dark-theme");

      setDarkMode(true);

    }

  }, []);

  const toggleTheme = () => {

    if (darkMode) {

      document.body.classList.remove("dark-theme");

      localStorage.setItem("theme", "light");

    }

    else {

      document.body.classList.add("dark-theme");

      localStorage.setItem("theme", "dark");

    }

    setDarkMode(!darkMode);

  };

  return (

    <button

      className="themeToggle"

      onClick={toggleTheme}

    >

      <span className="themeIcon">

        {

          darkMode

          ?

          <FaSun />

          :

          <FaMoon />

        }

      </span>

      <span>

        {

          darkMode

          ?

          "Light Mode"

          :

          "Dark Mode"

        }

      </span>

    </button>

  );

};

export default DarkModeToggle;
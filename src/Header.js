import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <h1>Website Title</h1>
      <button onClick={toggleTheme} style={{ float: 'right', fontSize: '1.5rem' }}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
};

export default Header;


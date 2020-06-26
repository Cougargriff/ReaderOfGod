import React from "react";
import "./App.css";
import Reader from "./components/Reader";
import SectionsContainer from "./components/SectionsContainer";
import Title from "./components/Title";

/* Array of Components to create sections for */
const sections = [Title];

function App() {
  return (
    <div className="App">
      <SectionsContainer components={sections} />
      <Reader />
    </div>
  );
}

export default App;

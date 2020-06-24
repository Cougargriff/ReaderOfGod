import React from "react";
import styled from "styled-components";
import "./App.css";
import Reader from "./components/Reader";
import SectionsContainer from "./components/SectionsContainer";
import Title from "./components/Title";

/* Array of Components to create sections for */
const sections = [Title, Reader];

function App() {
  return (
    <div className="App">
      <SectionsContainer components={sections} />
    </div>
  );
}

export default App;

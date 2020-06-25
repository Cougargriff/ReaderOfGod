import React from "react";
import styled from "styled-components";

/*
  For future styling...
*/
const Container = styled.section``;

/*
  Creates Sections from passed components in props.
  Index of component in props array serves as unique id.
*/
function SectionsContainer(props) {
  return (
    <div>
      {props.components.map((comp, index) => {
        return <Container id={index}>{comp()}</Container>;
      })}
    </div>
  );
}

export default SectionsContainer;

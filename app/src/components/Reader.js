import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchChapter } from "../redux/actions/ChapterActions";

const ChapterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const ReaderContainer = styled.div`
  display: inline-block;
`;

class Reader extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchChapter(this.props.currentChapter + 1));
  }

  getImages = () => {
    return (
      <ChapterContainer>
        {this.props.urls.map((url) => {
          return <img src={url} />;
        })}
      </ChapterContainer>
    );
  };

  render() {
    const loaded = false;
    return (
      <ReaderContainer>
        <h1>READER</h1>
        {this.props.isLoadedChapter ? (
          this.getImages()
        ) : (
          <ChapterContainer> Loading Chapter... </ChapterContainer>
        )}
      </ReaderContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentChapter: state.ChapterReducer.currentChapter,
    urls: state.ChapterReducer.urls,
    isLoadedChapter: state.ChapterReducer.isLoadedChapter,
  };
}

export default connect(mapStateToProps)(Reader);

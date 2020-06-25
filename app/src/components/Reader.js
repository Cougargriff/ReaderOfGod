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
  getNextChapter() {
    const { dispatch } = this.props;
    if (this.props.isFetchingChapter) {
    } else {
      dispatch(fetchChapter(this.props.currentChapter + 1));
    }
  }

  componentWillMount() {
    var self = this;
    window.addEventListener("scroll", function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
        self.getNextChapter();
      }
    });
  }

  componentDidMount() {
    this.getNextChapter();
  }

  getImages() {
    return (
      <ChapterContainer>
        {this.props.urls.map((url) => {
          return <img src={url} />;
        })}
      </ChapterContainer>
    );
  }

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
    isFetchingChapter: state.ChapterReducer.isFetchingChapter,
  };
}

export default connect(mapStateToProps)(Reader);

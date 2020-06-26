import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchChapter, fetchLinks } from "../redux/actions/ChapterActions";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

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

  getLinks() {
    const { dispatch } = this.props;
    dispatch(fetchLinks());
  }

  componentDidMount() {
    //this.getNextChapter();
    var self = this;
    window.addEventListener("scroll", function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
        self.getNextChapter();
      }
    });
    this.getLinks();
  }

  /* attempt to bypass 403 */
  fetchImage403(url) {
    /* fetch image with different headers */

    const userHeader = new Headers({
      "User-Agent":
        "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
      Referer: "https://aax-us-pdx.amazon.adsystem.com/",
      Server: "Apache",
      "access-control-origin-allow": "*",
      Host: "mwebtoon-phinf.pstatic.net",
      Accept: "image/webp.*/*",
      Connection: "keep-alive",
    });

    fetch(proxyurl + url, {
      headers: userHeader,
    }).then((data) => console.log(data));
  }

  getImages() {
    return (
      <ChapterContainer>
        {this.props.urls.map((url, index) => {
          return (
            <img
              key={this.props.currentChapter.toString() + index.toString()}
              src={url}
              alt=""
              url={url}
            />
          );
        })}
      </ChapterContainer>
    );
  }

  render() {
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

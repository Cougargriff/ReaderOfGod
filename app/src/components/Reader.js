import React, { useState, useEffect } from "react";
import styled from "styled-components";
import JSSoup from "jssoup";

const ChapterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const ReaderContainer = styled.div`
  display: inline-block;
`;

const chapterURL = (num) => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  return (
    proxyurl +
    "https://www.webtoons.com/en/fantasy/tower-of-god/season-1-ep-0/viewer?title_no=95&episode_no=" +
    num
  );
};

const getPage = (num) => {
  return fetch(chapterURL(num)).then((data) => data.text());
};

function Reader(props) {
  const [chapterNum, setChapter] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [src_urls, setUrls] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setChapter(chapterNum + 1);
      }
    });
  }, []);
  useEffect(requestPage, [chapterNum]);

  function requestPage(num = chapterNum) {
    console.log("Fetching chapter " + chapterNum);
    getPage(num).then((page) => {
      var soup = new JSSoup(page);
      const soupFind = soup.findAll("img", { class: "_images" });

      let new_src_urls = [...src_urls];
      soupFind.map((tag) => {
        new_src_urls.push(tag.attrs["data-url"]);
      });

      setLoaded(true);
      setUrls([...new_src_urls]);
      console.log(src_urls);
    });
  }

  function getImages() {
    return (
      <ChapterContainer>
        {src_urls.map((url) => {
          return <img src={url} />;
        })}
      </ChapterContainer>
    );
  }

  return (
    <ReaderContainer>
      <h1>READER</h1>
      {loaded ? (
        getImages()
      ) : (
        <ChapterContainer> Loading Chapter... </ChapterContainer>
      )}
    </ReaderContainer>
  );
}

export default Reader;

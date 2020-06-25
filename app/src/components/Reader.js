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

const getPage = () => {
  return fetch(chapterURL(1)).then((data) => data.text());
};

function Reader(props) {
  const [loaded, setLoaded] = useState(false);
  const [src_urls, setUrls] = useState([]);

  useEffect(requestPage, []);

  async function requestPage() {
    const page = await getPage();

    var soup = new JSSoup(page);
    const soupFind = soup.findAll("img", { class: "_images" });
    var src_urls = [];
    soupFind.map((tag) => {
      src_urls.push(tag.attrs["data-url"]);
    });

    setLoaded(true);
    setUrls(src_urls);

    // return (
    //   <div>
    //     {src_urls.map((url) => {
    //       return <img src={url} />;
    //     })}
    //   </div>
    // );
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
      {loaded ? getImages() : <div />}
    </ReaderContainer>
  );
}

export default Reader;

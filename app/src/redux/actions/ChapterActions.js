import JSSoup from "jssoup";
import {
  FETCH_CHAPTER_REQUEST,
  FETCH_CHAPTER_SUCCESS,
  FETCH_CHAPTER_FAILURE,
} from "./Types";

const chapterURL = (num) => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  return (
    proxyurl +
    "https://www.webtoons.com/en/fantasy/tower-of-god/season-1-ep-0/viewer?title_no=95&episode_no=" +
    num
  );
};

const userHeader = new Headers({
  "User-Agent": "Mozilla/5.0",
});

const getPage = (num, dispatch) => {
  return fetch(chapterURL(num), {
    headers: userHeader,
  })
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((data) => data.text())
    .catch((error) => {
      dispatch(chapterError(num));
    });
};

function requestPage(num, dispatch) {
  return getPage(num, dispatch)
    .then((page) => {
      var soup = new JSSoup(page);
      const soupFind = soup.findAll("img", { class: "_images" });

      let new_src_urls = [];
      soupFind.map((tag) => {
        new_src_urls.push(tag.attrs["data-url"]);
      });
      return new_src_urls;
    })
    .catch((error) => {
      dispatch(chapterError(num));
    });
}

const requestChapter = (num) => {
  return {
    type: FETCH_CHAPTER_REQUEST,
    chapter_num: num,
  };
};

const receiveChapter = (urls, num) => {
  return {
    type: FETCH_CHAPTER_SUCCESS,
    urls,
    chapter_num: num,
  };
};

const chapterError = (num) => {
  return {
    type: FETCH_CHAPTER_FAILURE,
    chapter_num: num,
  };
};

export const fetchChapter = (num) => async (dispatch) => {
  dispatch(requestChapter(num));
  const urls = await requestPage(num, dispatch);
  dispatch(receiveChapter(urls, num));
};

import JSSoup from "jssoup";
import {
  FETCH_CHAPTER_REQUEST,
  FETCH_CHAPTER_SUCCESS,
  FETCH_CHAPTER_FAILURE,
  FETCH_LINKS_REQUEST,
  FETCH_LINKS_SUCCESS,
  FETCH_LINKS_FAILURE,
} from "./Types";

const proxyurls = ["https://cors-anywhere.herokuapp.com/"];
const mainUrl =
  "https://www.webtoons.com/en/fantasy/tower-of-god/season-1-ep-0/viewer?title_no=95&episode_no=";

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

const requestLinks = () => {
  return {
    type: FETCH_LINKS_REQUEST,
  };
};

const receiveLinks = (links) => {
  return {
    type: FETCH_LINKS_SUCCESS,
    links,
  };
};

const linksError = () => {
  return {
    type: FETCH_LINKS_FAILURE,
  };
};

const chapterURL = (num, getState) => {
  if (getState().ChapterReducer.hasLinks) {
    return proxyurls[0] + getState().ChapterReducer.links[num - 1];
  } else {
    return proxyurls[0] + mainUrl + num;
  }
};

const userHeader = new Headers({
  "User-Agent":
    "Mozilla/5.0 (MaAcintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
  Referer: "https://aax-us-pdx.amazon.adsystem.com/",
  Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
});

const getPage = (num, getState) => {
  return fetch(chapterURL(num, getState), {
    headers: userHeader,
  })
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((data) => data.text())
    .catch((error) => {});
};

function requestPage(num, getState) {
  return getPage(num, getState)
    .then((page) => {
      var soup = new JSSoup(page);
      const soupFind = soup.findAll("img", { class: "_images" });
      const img_urls = soupFind.map((tag) => tag.attrs["data-url"]);
      return img_urls;
    })
    .catch((error) => {});
}

function getLinks(getState) {
  return getPage(1, getState)
    .then((page) => {
      var soup = new JSSoup(page);
      const pageLinks = soup.findAll("a", { class: " N=a:vbw.list,g:en_en" });
      const newLinks = pageLinks.map((link_tag) => link_tag.attrs.href);
      return newLinks;
    })
    .catch((error) => {});
}

export const fetchChapter = (num) => async (dispatch, getState) => {
  dispatch(requestChapter(num));
  const urls = await requestPage(num, getState);

  /* check if empty urls */
  if (urls.length !== 0) {
    dispatch(receiveChapter(urls, num));
  } else {
    dispatch(chapterError(num));
  }
};

export const fetchLinks = () => async (dispatch, getState) => {
  dispatch(requestLinks());
  const links = await getLinks(getState);
  if (links.length !== 0) {
    dispatch(receiveLinks(links));
    dispatch(fetchChapter(getState().ChapterReducer.currentChapter + 1));
  } else {
    dispatch(linksError());
  }
};

import {
  FETCH_CHAPTER_REQUEST,
  FETCH_CHAPTER_SUCCESS,
  FETCH_CHAPTER_FAILURE,
  FETCH_LINKS_SUCCESS,
  FETCH_LINKS_REQUEST,
  FETCH_LINKS_FAILURE,
} from "../actions/Types";

const initChapterState = {
  urls: [],
  links: [],
  hasLinks: false,
  isFetchingLinks: false,
  linksError: false,
  chapterError: false,
  isFetchingChapter: false,
  isLoadedChapter: false,
  currentChapter: 0,
};

const ChapterReducer = (state = initChapterState, action) => {
  switch (action.type) {
    case FETCH_CHAPTER_FAILURE:
      return {
        ...state,
        chapterError: true,
        isFetchingChapter: false,
      };
    case FETCH_CHAPTER_SUCCESS:
      return {
        ...state,
        isLoadedChapter: true,
        urls: [...state.urls, ...action.urls],
        currentChapter: action.chapter_num,
        isFetchingChapter: false,
      };
    case FETCH_CHAPTER_REQUEST:
      return {
        ...state,
        chapterError: false,
        isFetchingChapter: true,
      };
    case FETCH_LINKS_REQUEST:
      return {
        ...state,
        hasLinks: false,
        isFetchingLinks: true,
        linksError: false,
      };
    case FETCH_LINKS_SUCCESS:
      return {
        ...state,
        hasLinks: true,
        isFetchingLinks: false,
        links: [...action.links],
      };
    case FETCH_LINKS_FAILURE:
      return {
        ...state,
        linksError: true,
        isFetchingLinks: false,
      };
    default:
      return state;
  }
};

export default ChapterReducer;

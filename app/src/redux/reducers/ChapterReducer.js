import {
  FETCH_CHAPTER_REQUEST,
  FETCH_CHAPTER_SUCCESS,
  FETCH_CHAPTER_FAILURE,
} from "../actions/Types";

const initChapterState = {
  urls: [],
  chapterError: false,
  isLoadedChapter: false,
  currentChapter: 0,
};

const ChapterReducer = (state = initChapterState, action) => {
  switch (action.type) {
    case FETCH_CHAPTER_FAILURE:
      return {
        ...state,
        chapterError: true,
      };
    case FETCH_CHAPTER_SUCCESS:
      return {
        ...state,
        isLoadedChapter: true,
        urls: action.urls,
        currentChapter: action.chapter_num,
      };
    case FETCH_CHAPTER_REQUEST:
      return {
        ...state,
        chapterError: false,
      };
    default:
      return state;
  }
};

export default ChapterReducer;

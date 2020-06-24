import {
  FETCH_CHAPTER_REQUEST,
  FETCH_CHAPTER_SUCCESS,
  FETCH_CHAPTER_FAILURE,
} from "../actions/Types";

const initChapterState = {
  urls: [],
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
    default:
      return state;
  }
};

export default ChapterReducer;

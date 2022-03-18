// TO-DO: Split up reducers
// import { combineReducers } from 'redux';
import { ACTIONS } from '../actions';

import { models } from '../components/Input/models';
import { STATECODE } from '../constants';
import { Pinyin } from '../languages/Chinese/Pinyin';

const initialState = {
  start: false, // Has user started typing?
  completed: false, // Has user reached end of excerpt?
  language: 'zh', // Language code
  model: models.modelThree, // Feedback mechanism based on langauge
  position: 0, // Which character are they at?
  charPosition: 0, // DEPRECATED
  input: '', // Current user input
  words: '', // Text excerpt (str)
  typingStatus: false, // DEPRECATED
  inputStatus: STATECODE.READY, // Current state of input correctness
  errorPositions: [], // Keep track of word positions where errors occurred
  hintCount: 0, // Keep track of how many hints user requested when typing an excerpt
  pinyinAssist: 0, // Number of letters to reveal in Pinyin assist
  resetInput: () => {}, // SlateJS function to reset input - updated when Slate editor is initialized
  time: 10000, // BROKEN - Remaining time to type excerpt
  eventLog: [], // Log of typing events
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.START:
      return {
        ...state,
        start: true,
        eventLog: [...state.eventLog, action.payload],
      };
    case ACTIONS.END:
      return {
        ...state,
        start: false,
        completed: true,
        eventLog: [...state.eventLog, action.payload],
      };
    case ACTIONS.INPUT:
      return {
        ...state,
        input: action.payload,
      };

    case ACTIONS.NEWEXCERPT:
      return {
        ...state,
        words: action.payload,
      };

    case ACTIONS.NEXTSENTENCE:
      return {
        ...state,
        input: '',
        charPosition: state.charPosition + 1,
      };

    case ACTIONS.NEXTCHARACTER:
      return {
        ...state,
        position: state.position + 1,
        charPosition: state.charPosition + 1,
        pinyinAssist: 0,
      };

    case ACTIONS.SPACE:
      return {
        ...state,
        position: state.position + 1,
        charPosition: 0,
        input: '',
        inputStatus: STATECODE.READY,
      };

    case ACTIONS.BACKSPACE:
      return {
        ...state,
        position: state.position - 1,
        charPosition: state.charPosition - 1,
        inputStatus: STATECODE.READY,
      };

    case ACTIONS.RESETINPUT:
      return {
        ...state,
        input: '',
        charPosition: 0,
      };

    case ACTIONS.INPUTSTATUS:
      return {
        ...state,
        inputStatus: action.payload,
      };

    case ACTIONS.PINYINASSISTHINT:
      if (
        state.pinyinAssist < Pinyin[state.words[state.position]]['pinyin'].length
      ) {
        return {
          ...state,
          pinyinAssist: state.pinyinAssist + 1,
          hintCount: state.hintCount + 1,
        };
      } else {
        return { ...state };
      }
    case ACTIONS.RESET:
      return {
        ...state,
        position: 0,
        charPosition: 0,
        input: '',
        inputStatus: STATECODE.READY,
        errorPositions: [],
        hintCount: 0,
        start: false,
        completed: false,
        pinyinAssist: 0,
        eventLog: [],
      };

    case ACTIONS.ERROR:
      if (state.errorPositions.includes(action.payload)) {
        return state;
      } else {
        return {
          ...state,
          errorPositions: [...state.errorPositions, action.payload],
        };
      }

    case ACTIONS.SET_RESETINPUT:
      return {
        ...state,
        resetInput: action.payload,
      };

    case ACTIONS.COMPLETE:
      return {
        ...state,
        start: false,
        completed: true,
      };

    case ACTIONS.CHANGELANGUAGE:
      return {
        ...state,
        language: action.payload,
        position: 0,
        charPosition: 0,
        input: '',
        inputStatus: STATECODE.READY,
      };

    case ACTIONS.UPDATETIME:
      return {
        ...state,
        time: state.start ? state.time - action.payload : state.time,
      };

    case ACTIONS.EVENTLOG:
      return {
        ...state,
        eventLog: [...state.eventLog, action.payload],
      };

    default:
      return state;
  }
};

export default rootReducer;

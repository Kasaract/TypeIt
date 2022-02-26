// TO-DO: Split up reducers
// import { combineReducers } from 'redux';

import { ACTIONS } from '../actions';

import { models } from '../components/Input/models';
import { sampleChinese } from '../languages/sampleText';
import { STATECODE } from '../constants';
import { Pinyin } from '../languages/Chinese/Pinyin';

const text = sampleChinese[Math.floor(Math.random() * 1)];

const initialState = {
  start: false,
  language: 'zh',
  model: models.modelThree,
  position: 0,
  charPosition: 0,
  input: '',
  words: text.join(''),
  typingStatus: false,
  inputStatus: STATECODE.READY,
  errorCount: 0,
  pinyinAssist: 0,
  time: 10000, // milliseconds
  eventLog: [],
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
        eventLog: [...state.eventLog, action.payload],
      };
    case ACTIONS.INPUT:
      return {
        ...state,
        input: action.payload,
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
      if (state.pinyinAssist < Pinyin[state.words[state.position]].length) {
        return {
          ...state,
          pinyinAssist: state.pinyinAssist + 1,
          // eventLog: [
          //   ...state.eventLog,
          //   {
          //     type: 'HINT',
          //     word: state.words[state.position],
          //     pinyin: Pinyin[state.words[state.position]],
          //     timestamp: action.payload.timeStamp,
          //   },
          // ],
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
        start: false,
        pinyinAssist: 0,
      };

    case ACTIONS.COMPLETE:
      return {
        ...state,
        start: false,
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

// TO-DO: Split up reducers
// import { combineReducers } from 'redux';

import { ACTIONS } from '../actions';

import { models } from '../components/Input/models';
import { sampleChinese } from '../languages/sampleText';
import { STATECODE } from '../constants';

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
  pinyinAssistFeature: false,
  pinyinAssistDelay: 3,
  pinyinAssist: false,
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

    case ACTIONS.PINYINASSISTON:
      return {
        ...state,
        pinyinAssist: true,
        eventLog: [...state.eventLog, action.payload],
      };

    case ACTIONS.PINYINASSISTOFF:
      return {
        ...state,
        pinyinAssist: false,
      };

    case ACTIONS.PINYINASSISTFEATURE:
      return {
        ...state,
        pinyinAssistFeature: !state.pinyinAssistFeature,
      };

    case ACTIONS.PINYINASSISTDELAY:
      return {
        ...state,
        pinyinAssistDelay: action.payload,
      };

    case ACTIONS.RESET:
      return {
        ...state,
        position: 0,
        charPosition: 0,
        input: '',
        inputStatus: STATECODE.READY,
        start: false,
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

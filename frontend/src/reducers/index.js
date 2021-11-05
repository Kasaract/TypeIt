// TO-DO: Split up reducers
// import { combineReducers } from 'redux';

import { ACTIONS } from '../actions';

import { models } from '../components/Input/models';
import { sampleChinese } from '../languages/sampleText';
import { STATECODE } from '../constants';

const initialState = {
  language: 'zh',
  model: models.modelThree,
  position: 0,
  charPosition: 0,
  input: '',
  words: sampleChinese[Math.floor(Math.random() * 3)],
  wordIndex: 0,
  typingStatus: false,
  inputStatus: STATECODE.READY,
  errorCount: 0,
  assist: '',
  eventLog: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INPUT:
      return {
        ...state,
        input: action.payload,
      };

    case ACTIONS.NEXTWORD:
      return {
        ...state,
        wordIndex: state.wordIndex + 1,
        input: '',
      };

    case ACTIONS.SPACE:
      return {
        ...state,
        position: state.position + 1,
        wordIndex: state.wordIndex + 1,
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
      };

    case ACTIONS.INPUTSTATUS:
      return {
        ...state,
        inputStatus: action.payload,
      };

    case ACTIONS.RESET:
      return {
        ...state,
        position: 0,
        charPosition: 0,
        wordIndex: 0,
        input: '',
        inputStatus: STATECODE.READY,
      };

    case ACTIONS.COMPLETE:
      return {
        ...state,
      };

    case ACTIONS.CHANGELANGUAGE:
      return {
        ...state,
        language: action.payload,
        position: 0,
        charPosition: 0,
        wordIndex: 0,
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

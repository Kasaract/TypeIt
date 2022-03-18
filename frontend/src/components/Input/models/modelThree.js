// Chinese

import { ACTIONS } from '../../../actions';

import { STATECODE } from '../../../constants';

const onInputChange = (
  newInput,
  timeStamp,
  inputStatus,
  position,
  charPosition,
  words,
  onCompleted,
  dispatch
) => {
  newInput = newInput.replace(/\uFEFF/g, '');
  // ****** READY ******

  const onReady = (newInput) => {
    // When you type in Chinese, a blank zero-width character gets added in a seemingly random
    // position, at least for Windows keyboards. To avoid undeterministic behavior, filter occurs here.
    // Unsure if cause is Microsoft or SlateJS.
    // - Gary 01/19/22

    let isIncorrect = false;

    // Type character(s)
    for (let i = charPosition; i < newInput.length; i++) {
      // Correct character
      if (
        position < words.length &&
        newInput[i] === words[position + i - charPosition]
      ) {
        dispatch({
          type: ACTIONS.EVENTLOG,
          payload: {
            type: 'CORRECT',
            word: words[position + i - charPosition],
            timeStamp,
          },
        });
        if (!isIncorrect) {
          dispatch({
            type: ACTIONS.NEXTCHARACTER,
          });
        }
      }

      // Incorrect character
      else {
        isIncorrect = true; // Mark input as incorrect, but continue to check remaining characters
        dispatch({ type: ACTIONS.ERROR, payload: i }); // Keep track of word position where error is made
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.INCORRECT });
        dispatch({
          type: ACTIONS.EVENTLOG,
          payload: { type: 'INCORRECT', word: words[position], timeStamp },
        });
      }
    }

    if (
      position + newInput.length - charPosition === words.length &&
      newInput.charAt(newInput.length - 1) ===
        words[position + newInput.length - charPosition - 1]
    ) {
      // Attempt to add timer - Gary 11/22
      // dispatch({
      //   type: ACTIONS.END,
      //   payload: {
      //     type: 'END',
      //     timeStamp,
      //   },
      // });

      // STATE CODE END is deprecated
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
      dispatch({
        type: ACTIONS.EVENTLOG,
        payload: { type: 'END', timeStamp },
      });
      onCompleted();
      // dispatch({ type: ACTIONS.RESETINPUT });
    }
  };

  // ****** INCORRECT ******

  const onIncorrect = (newInput) => {
    let correct = true;

    // No way to tell if excerpt or input is longer
    for (let i = 0; i < Math.min(newInput.length, words.length); i++) {
      if (newInput[i] !== words[i]) {
        correct = false;
        break;
      }
    }

    if (correct) {
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
    }
  };

  // STATE-BASED LOGIC
  dispatch({ type: ACTIONS.INPUT, payload: newInput });

  switch (inputStatus) {
    case STATECODE.READY:
      onReady(newInput);
      break;
    case STATECODE.INCORRECT:
      onIncorrect(newInput);
      break;
    default:
      throw new Error('Should not get here');
  }
};

export const modelThree = {
  onInputChange: onInputChange,
  preprocess: (text) => text,
  display: (words) => words,
};

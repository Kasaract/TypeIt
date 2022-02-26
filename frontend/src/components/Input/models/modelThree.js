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
        dispatch({
          type: ACTIONS.NEXTCHARACTER,
        });
      }
      // Incorrect character
      else {
        dispatch({
          type: ACTIONS.EVENTLOG,
          payload: { type: 'INCORRECT', word: words[position], timeStamp },
        });
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.INCORRECT });

        break; // No need to check if at least one is incorrect
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
      onCompleted();
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.END });
      dispatch({
        type: ACTIONS.EVENTLOG,
        payload: { type: 'END', timeStamp },
      });
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

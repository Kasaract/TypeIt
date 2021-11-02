// Chinese

import { ACTIONS } from '../../../actions';

import { STATECODE } from '../../../constants';

const onInputChange = (
  newInput,
  inputStatus,
  charPosition,
  words,
  wordIndex,
  onCompleted,
  dispatch
) => {
  // ****** READY ******

  const onReady = (newInput) => {
    // Maybe add support for question mark?
    if (words[wordIndex] === '。' && newInput === '。') {
      dispatch({ type: ACTIONS.NEXTWORD });

      if (wordIndex === words.length - 1) {
        onCompleted();
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.END }); // Should actually make input be disabled to protect from unwanted behavior
      }
    } else if (words[wordIndex] === '，' && newInput === '，') {
      dispatch({ type: ACTIONS.NEXTWORD });
      if (wordIndex === words.length - 1) {
        onCompleted();
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.END }); // Should actually make input be disabled to protect from unwanted behavior
      }
    } else if (!newInput.match(/^[0-9a-zA-Z']+$/)) {
      if (newInput === '。' || newInput === '，') {
        dispatch({ type: ACTIONS.RESETINPUT });
        newInput = '';
      }

      // Type character
      const correctChar = words[wordIndex];

      // Type correct character
      if (newInput === correctChar) {
        dispatch({ type: ACTIONS.NEXTWORD });

        // Type last char of entire text
        if (wordIndex === words.length - 1) {
          onCompleted();
          dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.END }); // Should actually make input be disabled to protect from unwanted behavior
        }
      }
      // Typed incorrect character
      else if (newInput.length > 0) {
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.INCORRECT });
      }
    }
  };

  // ****** INCORRECT ******

  const onIncorrect = (newInput) => {
    // Clear input field
    if (newInput === '') {
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
    }
  };

  // ****** END ******

  const onEnd = (newInput) => {
    // Type backspace
    if (newInput.length < charPosition) {
      dispatch({ type: ACTIONS.RESETINPUT });
    }

    // Type character
    else {
      // Type space
      if (newInput.charAt(newInput.length - 1) === ' ') {
        dispatch({ type: ACTIONS.SPACE });
      }
      // Did not type space
      else {
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.INCORRECT });
      }
    }
  };

  // STATE-BASED LOGIC
  dispatch({ type: ACTIONS.INPUT, payload: newInput });

  // if (newInput.length === 1) {
  //   setTimeRunning(true);
  // }

  switch (inputStatus) {
    case STATECODE.READY:
      onReady(newInput);
      break;
    case STATECODE.INCORRECT:
      onIncorrect(newInput);
      break;
    case STATECODE.END:
      onEnd(newInput);
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

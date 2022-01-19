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
  setTimer,
  dispatch
) => {
  // ****** READY ******

  const onReady = (newInput) => {
    dispatch({ type: ACTIONS.PINYINASSISTMESSAGEOFF });
    setTimer(0);

    // Does this even work? - Gary 11/22
    // Maybe add support for question mark?
    if (words[charPosition] === '。' && newInput === '。') {
      dispatch({
        type: ACTIONS.EVENTLOG,
        payload: { type: 'CORRECT', word: words[charPosition], timeStamp },
      });
      dispatch({ type: ACTIONS.NEXTCHARACTER });

      if (charPosition === words.length - 1) {
        onCompleted();
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.END }); // Should actually make input be disabled to protect from unwanted behavior
      }
    } else if (words[charPosition] === '，' && newInput === '，') {
      dispatch({ type: ACTIONS.NEXTCHARACTER });
      if (charPosition === words.length - 1) {
        onCompleted();
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.END }); // Should actually make input be disabled to protect from unwanted behavior
      }
    }
    // Backspace
    else if (
      position - 2 >= 0 &&
      newInput.charAt(newInput.length - 1) === words[position - 2] // Very strange indexing
    ) {
      // TODO: Bug for repeated characters
      dispatch({ type: ACTIONS.BACKSPACE });
    }

    // Typing single period resets the input
    // else if (newInput === '。' && words[position] === '。') {
    //   dispatch({ type: ACTIONS.RESETINPUT });
    //   newInput = '';
    // }
    else {
      // Type character(s)
      for (let i = charPosition; i < newInput.length - 1; i++) {
        // Correct character
        if (
          position < words.length &&
          newInput[i + 1] === words[position + i - charPosition] // The i + 1 is due to a strange indexing by SlateJS
        ) {
          dispatch({
            type: ACTIONS.NEXTCHARACTER,
          });
          // if (newInput[i] === '。') {
          //   dispatch({ type: ACTIONS.RESETINPUT });
          // }
        }
        // Incorrect character
        else {
          dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.INCORRECT });
          dispatch({
            type: ACTIONS.EVENTLOG,
            payload: { type: 'INCORRECT', word: words[position], timeStamp },
          });
          break;
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
        dispatch({ type: ACTIONS.RESETINPUT });
      }
    }
  };

  // ****** INCORRECT ******

  const onIncorrect = (newInput) => {
    // Clear input field
    if (newInput === '') {
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
    } else if (newInput.charAt(newInput.length - 1) === words[position - 1]) {
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

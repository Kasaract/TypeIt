// Korean

/***
 * UNSOLVED BUGS
 *
 * - 에사 as a typo when typing 엣나
 * - ㅇㅇ as a type when typing 잇, can't backspace atm
 *
 */

import { ACTIONS } from '../../../actions';
import { STATECODE } from '../../../constants';
import { KoreanIntermediate } from '../../../languages/Korean/KoreanIntermediate';

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
  console.log('Status:', inputStatus);
  newInput = newInput.replace(/\uFEFF/g, '');
  // ****** READY ******

  const onReady = (newInput) => {
    // Type character(s)
    // for (let i = charPosition; i < newInput.length; i++) {
    // Correct character
    // console.log('words', words);
    // console.log('position', position);
    // console.log('progression path', KoreanIntermediate[words[position]]);

    const currChar = newInput.charAt(newInput.length - 1);
    console.log('CurrChar', currChar);
    if (
      position < words.length &&
      (words[position] === ' ' ||
        KoreanIntermediate[words[position]]['path'].includes(currChar)) // NEED TO SUPPORT NUMBERS
    ) {
      dispatch({
        type: ACTIONS.EVENTLOG,
        payload: {
          type: 'CORRECT',
          word: words[position],
          input: currChar,
          timeStamp,
        },
      });
      if (currChar === words[position]) {
        // Once a block is finished, transition to 'Complete Block' state if next char
        // is a block to watch for the first character of the next block. Its intermediate
        // state might be temporarily considered as the final consonant of previous block.
        if (words[position + 1] === ' ') {
          dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
        } else {
          console.log('Do I make it here?');
          dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.COMPLETEBLOCK });
        }

        dispatch({
          type: ACTIONS.NEXTCHARACTER,
        });
      }
    }

    // Incorrect character
    else {
      // Error detection for Korean is a bit more complex - Gary 04/14
      // dispatch({ type: ACTIONS.ERROR, payload: position }); // Keep track of word position where error is made
      if (currChar === words[position - 1] || newInput === '') {
        return; // Should be an EventLog dispatch here - Gary 04/14
      } else {
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.INCORRECT });
        dispatch({
          type: ACTIONS.EVENTLOG,
          payload: { type: 'INCORRECT', word: words[position], timeStamp }, // Need to account for character - Gary 04/14
        });
      }
    }
    // }

    if (
      position + newInput.length - charPosition === words.length &&
      currChar === words[position + newInput.length - charPosition - 1]
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
    const currChar = newInput.charAt(newInput.length - 1);

    if (
      KoreanIntermediate[words[position]]['path'].includes(currChar) || // Backspace one character while typing a block
      currChar === words[position - 1] || // Backspace an entire block
      newInput === '' // Input is empty
    ) {
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
    }
  };

  // ****** COMPLETE BLOCK ******
  // This state exists only for Korean to handle the cases where the initial letter of the next block
  // is temporarily added to the final consonant of the previous block. Users should only be in the
  // Complete Block state for one step

  const onCompleteBlock = (newInput) => {
    const currBlock = words[position];

    // Initial letter of current block does not get added to final consonant of previous block
    const currChar = newInput.charAt(newInput.length - 1);
    if (KoreanIntermediate[currBlock]['path'].includes(currChar)) {
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
      return;
    }

    // A strange occurence happens when there are blocks that need to enter the Complete Block
    // state where the onInputChange is ran automatically without any user input.
    // Example that prompted this if-block: 부부가
    if (currChar === words[position - 1]) {
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.COMPLETEBLOCK });
      return;
    }

    let prevBlockFinal, currBlockInitial;

    if (currChar in KoreanIntermediate) {
      prevBlockFinal = KoreanIntermediate[currChar]['finalInitialCode'];
    }
    currBlockInitial = KoreanIntermediate[currBlock]['initialCode'];

    // Compare last consonant of prev block to first consonant of current block
    if (prevBlockFinal === currBlockInitial) {
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
    } else {
      dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.INCORRECT });
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
    case STATECODE.COMPLETEBLOCK:
      onCompleteBlock(newInput);
      break;
    default:
      throw new Error('Should not get here');
  }
};

export const modelFour = {
  onInputChange: onInputChange,
  preprocess: (text) => text,
  display: (words) => words,
};

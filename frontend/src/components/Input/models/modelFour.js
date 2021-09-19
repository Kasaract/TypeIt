import { STATECODE } from '../../../constants';

import { KoreanIntermediate } from '../../../languages/Korean/KoreanIntermediate';

const onInputChange = (
  newInput,
  setInput,
  inputStatus,
  setInputStatus,
  position,
  setPosition,
  charPosition,
  setCharPosition,
  words,
  wordIndex,
  setWordIndex,
  onCompleted,
  textLength
  // errorCount,
  // setErrorCount,
  // setKeyboardAssist
) => {
  // ****** READY ******

  const onReady = (newInput) => {
    // Type backspace
    if (newInput.length < charPosition) {
      setPosition(position - 1);
      setCharPosition(charPosition - 1);
    }

    // Type initial consonant of next block (results in initial consonant being the final consonant of previous block)
    else if (newInput.length === charPosition) {
      setInputStatus(STATECODE.INITIALPROGRESS);
    }

    // Type character
    else {
      const inputChar = newInput.charAt(newInput.length - 1);
      const correctChar = words[wordIndex].charAt(charPosition);

      // Type correct character
      if (inputChar === correctChar) {
        setPosition(position + 1);
        setCharPosition(charPosition + 1);

        // Type last char of entire text
        if (
          position === textLength - 1 &&
          charPosition === words[wordIndex].length - 1
        ) {
          onCompleted();
          setInputStatus(STATECODE.END); // Should actually make input be disabled to protect from unwanted behavior
        }

        // Type last char of word. Transition to END state.
        else if (charPosition === words[wordIndex].length - 1) {
          setInputStatus(STATECODE.END);
        }
      }

      // Type intermediate character
      else if (KoreanIntermediate[correctChar].includes(inputChar)) {
        setInputStatus(STATECODE.INPROGRESS);
      }

      // Typed incorrect character
      else {
        setInputStatus(STATECODE.INCORRECT);
      }
    }
  };

  // ****** INITIAL PROGRESS ******

  const onInitialProgress = (newInput) => {
    // NOTE: Can only stay in this state for one time step!
    if (newInput.length - 1 === charPosition) {
      const inputChar = newInput.charAt(newInput.length - 1);
      const correctChar = words[wordIndex].charAt(charPosition);

      // In progress block is correct, proceed to next block
      if (inputChar === correctChar) {
        setPosition(position + 1);
        setCharPosition(charPosition + 1);

        if (charPosition === words[wordIndex].length - 1) {
          setInputStatus(STATECODE.END);

          // Last block of text
          if (wordIndex === words.length - 1) {
            onCompleted();
          }
        } else {
          setInputStatus(STATECODE.READY);
        }
      } else if (KoreanIntermediate[correctChar].includes(inputChar)) {
        setInputStatus(STATECODE.INPROGRESS);
      } else {
        setInputStatus(STATECODE.INCORRECT);
      }
    }
  };

  const onProgress = () => {
    // Type backspace
    if (newInput.length < charPosition) {
      setPosition(position - 1);
      setCharPosition(charPosition - 1);
    }

    // Type character
    else {
      const inputChar = newInput.charAt(newInput.length - 1);
      const correctChar = words[wordIndex].charAt(charPosition);

      // Type correct character
      if (inputChar === correctChar) {
        setPosition(position + 1);
        setCharPosition(charPosition + 1);

        // Type last char of word. Transition to END state.
        if (charPosition === words[wordIndex].length - 1) {
          setInputStatus(STATECODE.END);

          if (wordIndex === words.length - 1) {
            onCompleted();
          }
        } else {
          setInputStatus(STATECODE.READY);
        }
      }

      // Type another intermediate character
      else if (KoreanIntermediate[correctChar].includes(inputChar)) {
        setInputStatus(STATECODE.INPROGRESS);
      }

      // Typed incorrect character
      else {
        setInputStatus(STATECODE.INCORRECT);
      }
    }
  };

  // ****** INCORRECT ******

  const onIncorrect = (newInput) => {
    console.log(newInput.length, charPosition);

    // Type wrong character for space
    if (
      newInput.length - 1 < charPosition &&
      charPosition === words[wordIndex].length
    ) {
      setInputStatus(STATECODE.END);
    }

    // Backspaced to typo position
    else if (newInput.length - 1 === charPosition) {
      const inputChar = newInput.charAt(newInput.length - 1);
      const correctChar = words[wordIndex].charAt(charPosition);

      // Type correct character
      if (inputChar === correctChar) {
        setPosition(position + 1);
        setCharPosition(charPosition + 1);
        setInputStatus(STATECODE.READY);
      } else if (KoreanIntermediate[correctChar].includes(inputChar)) {
        setInputStatus(STATECODE.INPROGRESS);
      }
    }

    // Backspaced characters before typo (previously correct characters)
    else if (newInput.length - 1 < charPosition) {
      setInputStatus(STATECODE.READY);
    }

    // Backspaced current in-progress syllable block
    // else if (newInput.length === charPosition && newInput.length > 0) {
    //   const inputChar = newInput.charAt(newInput.length - 1);
    //   const correctChar = words[wordIndex].charAt(charPosition);

    //   // For typos like 필요 vs 피라
    //   if (inputChar !== correctChar) {
    //     // setPosition(position - 1);
    //     // setCharPosition(charPosition - 1);
    //     setInputStatus(stateCode.INCORRECT);
    //   } else {
    //     setInputStatus(stateCode.READY);
    //   }
    // }

    // Typed incorrect letter (current block is not a valid intermediate)
    else if (newInput.length === charPosition) {
      const inputChar = newInput.charAt(newInput.length - 1);
      const correctChar = words[wordIndex].charAt(charPosition);

      // Backspaced to a valid intermediate block
      if (KoreanIntermediate[correctChar].includes(inputChar)) {
        setInputStatus(STATECODE.INPROGRESS);
      }
    }
  };

  // ****** END ******

  const onEnd = (newInput) => {
    // Type backspace
    if (newInput.length < charPosition) {
      setPosition(position - 1);
      setCharPosition(charPosition - 1);
      setInputStatus(STATECODE.READY);
    }

    // Type character
    else {
      // Type space
      if (newInput.charAt(newInput.length - 1) === ' ') {
        setPosition(position + 1);
        setWordIndex(wordIndex + 1);
        setCharPosition(0);
        setInput('');
        setInputStatus(STATECODE.READY);
      }
      // Did not type space
      else {
        setInputStatus(STATECODE.INCORRECT);
      }
    }
  };

  console.log(inputStatus);

  // STATE-BASED LOGIC
  setInput(newInput);
  switch (inputStatus) {
    case STATECODE.READY:
      onReady(newInput);
      break;
    case STATECODE.INITIALPROGRESS:
      onInitialProgress(newInput);
      break;
    case STATECODE.INPROGRESS:
      onProgress(newInput);
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

export const modelFour = {
  onInputChange: onInputChange,
};

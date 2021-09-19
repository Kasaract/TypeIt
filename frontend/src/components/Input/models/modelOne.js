import { STATECODE } from '../../../constants';

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
  textLength,
  errorCount,
  setErrorCount,
  // setKeyboardAssist
) => {
  // ****** READY ******

  const onReady = (newInput) => {
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

      // Typed incorrect character
      else {
        setInputStatus(STATECODE.INCORRECT);
      }
    }
  };

  // ****** INCORRECT ******

  const onIncorrect = (newInput) => {
    setErrorCount(errorCount+1);
    console.log(`errorCount is ${errorCount}`);

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
      errorCount+=1;
      console.log(`error count is ${errorCount}`);
      // Type correct character
      if (inputChar === correctChar) {
        setPosition(position + 1);
        setCharPosition(charPosition + 1);
        setInputStatus(STATECODE.READY);
      } 
    }

    // Backspaced characters before typo (previously correct characters)
    else if (newInput.length - 1 < charPosition) {
      setInputStatus(STATECODE.READY);
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

  // STATE-BASED LOGIC
  setInput(newInput);
  // errorCount = 0;
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

export const modelOne = {
  onInputChange: onInputChange,
  preprocess: (text) => text.split(' '),
  display: (words) => words.join(' '),
};

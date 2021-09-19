// Chinese

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
  textLength
  // errorCount,
  // setErrorCount,
  // setKeyboardAssist
) => {
  // ****** READY ******

  const onReady = (newInput) => {
    // Maybe add support for question mark?
    if (words[wordIndex] === '。' && newInput === '。') {
      setWordIndex(wordIndex + 1);
      setInput('');
      if (wordIndex === words.length - 1) {
        onCompleted();
        setInputStatus(STATECODE.END); // Should actually make input be disabled to protect from unwanted behavior
      }
    } else if (words[wordIndex] === '，' && newInput === '，') {
      setWordIndex(wordIndex + 1);
      setInput('');
      if (wordIndex === words.length - 1) {
        onCompleted();
        setInputStatus(STATECODE.END); // Should actually make input be disabled to protect from unwanted behavior
      }
    } else if (!newInput.match(/^[0-9a-zA-Z']+$/)) {
      if (newInput === '。' || newInput === '，') {
        setInput('');
        newInput = '';
      }

      // Type character
      const correctChar = words[wordIndex];

      // Type correct character
      if (newInput === correctChar) {
        setWordIndex(wordIndex + 1);
        setInput('');

        // Type last char of entire text
        if (wordIndex === words.length - 1) {
          onCompleted();
          setInputStatus(STATECODE.END); // Should actually make input be disabled to protect from unwanted behavior
        }
      }
      // Typed incorrect character
      else if (newInput.length > 0) {
        setInputStatus(STATECODE.INCORRECT);
      }
    }
  };

  // ****** INCORRECT ******

  const onIncorrect = (newInput) => {
    // Clear input field
    if (newInput === '') {
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

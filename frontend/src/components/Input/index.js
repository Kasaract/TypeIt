import { useContext } from 'react';
import { FormControl } from 'react-bootstrap';

import {
  CharPositionContext,
  InputContext,
  WordsContext,
  ModelContext,
  ErrorCountContext,
  TimeRunningContext,
} from '../../context';
import { STATECODE } from '../../constants';

export default function Input({
  onCompleted,
  textLength,
  position,
  setPosition,
  inputStatus,
  setInputStatus,
  errorCount,
  setErrorCount,
  assist,
  setAssist,
}) {
  const { charPosition, setCharPosition } = useContext(CharPositionContext);
  const { words, wordIndex, setWordIndex } = useContext(WordsContext);
  const { input, setInput } = useContext(InputContext);
  const { model } = useContext(ModelContext);
  const { timeRunning, setTimeRunning } = useContext(TimeRunningContext);

  const onInputChange = (newInput) => {
    model.onInputChange(
      // model 1
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
      timeRunning,
      setTimeRunning,
      errorCount,
      setErrorCount,
      assist,
      setAssist
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center px-5 pt-5">
      <FormControl
        style={{
          borderColor: 'black',
          borderRadius: '1rem',
          fontSize: '1.75rem',
          backgroundColor: inputStatus === STATECODE.INCORRECT && '#faa7a7',
        }}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        aria-label="Username"
      />
    </div>
  );
}

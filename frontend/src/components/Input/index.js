import { useContext } from 'react';
import { FormControl } from 'react-bootstrap';

import {
  LanguageContext,
  CharPositionContext,
  InputContext,
  WordsContext,
  ModelContext,
} from '../../context';
import { STATECODE } from '../../constants';

export default function Input({
  onCompleted,
  textLength,
  position,
  setPosition,
  inputStatus,
  setInputStatus,
}) {
  const { language } = useContext(LanguageContext);
  const { charPosition, setCharPosition } = useContext(CharPositionContext);
  const { words, wordIndex, setWordIndex } = useContext(WordsContext);
  const { input, setInput } = useContext(InputContext);
  const { model } = useContext(ModelContext);

  console.log('THIS IS MY MODEL');
  console.log(model);

  const onInputChange = (newInput) =>
    model.onInputChange(
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
    );

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

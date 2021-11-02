// Diff match patch

import { useSelector, useDispatch } from 'react-redux';
import { FormControl } from 'react-bootstrap';

import { STATECODE } from '../../constants';

export default function Input({ onCompleted }) {
  const model = useSelector((state) => state.model);
  const words = useSelector((state) => state.words);
  const wordIndex = useSelector((state) => state.wordIndex);
  const charPosition = useSelector((state) => state.charPosition);
  const input = useSelector((state) => state.input);
  const inputStatus = useSelector((state) => state.inputStatus);

  const dispatch = useDispatch();

  const onInputChange = (newInput) => {
    model.onInputChange(
      newInput.target.value,
      inputStatus,
      charPosition,
      words,
      wordIndex,
      onCompleted,
      dispatch
    );
  };

  const onKeyPress = (keystroke) => {
    console.log(keystroke);
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
        onChange={(e) => onInputChange(e)}
        // o={(e) => onKeyUp(e)}
        onKeyPressCapture={(e) => onKeyPress(e)}
        aria-label="Username"
      />
    </div>
  );
}

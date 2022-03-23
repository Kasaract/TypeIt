import { useContext } from 'react';
import { WordsContext, InputStatusContext } from '../../context';

import { STATECODE, STATUSCOLOR } from '../../constants';

export default function MorseCodeTypingText({ text }) {
  const { wordIndex } = useContext(WordsContext);
  const { inputStatus } = useContext(InputStatusContext);

  let color;

  if (inputStatus !== STATECODE.INCORRECT) {
    color = STATUSCOLOR.CURRENT;
  } else if (inputStatus === STATECODE.INCORRECT) {
    color = STATUSCOLOR.INCORRECT;
  }

  return (
    <div className="d-flex justify-content-center align-items-center px-5 py-2">
      <div
        className="p-3"
        style={{ border: '.15rem solid #636363', borderRadius: '.5rem' }}
      >
        <div style={{ fontFamily: 'Roboto' }}>
          {/* Correct  */}
          <span
            style={{
              fontSize: '2rem',
              backgroundColor: STATUSCOLOR.CORRECT,
              userSelect: 'none',
            }}
          >
            {text.slice(0, wordIndex).join(' ') + ' '}
          </span>

          {/* Current character  */}
          <span
            style={{
              fontSize: '2rem',
              backgroundColor: color,
              textDecoration: 'underline',
              userSelect: 'none',
            }}
          >
            {`${text[wordIndex]} `}
          </span>

          {/* Have not reached yet */}
          <span style={{ fontSize: '2rem', userSelect: 'none' }}>
            {text.slice(wordIndex + 1).join(' ')}
          </span>
        </div>
      </div>
    </div>
  );
}

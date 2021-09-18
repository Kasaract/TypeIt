// import { useContext } from 'react';

// import { PositionContext, InputStatusContext } from '../../context';

import { STATECODE, STATUSCOLOR } from '../../constants';

export default function TypingText({ text, position, inputStatus }) {
  let color = STATUSCOLOR.CURRENT;
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
            {text.substring(0, position)}
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
            {text.substring(position, position + 1)}
          </span>

          {/* Have not reached yet */}
          <span style={{ fontSize: '2rem', userSelect: 'none' }}>
            {text.substring(position + 1)}
          </span>
        </div>
      </div>
    </div>
  );
}

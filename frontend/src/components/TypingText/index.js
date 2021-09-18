import { STATUSCOLOR } from '../../constants';

const sample =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default function TypingText({ text }) {
  let color = STATUSCOLOR.CURRENT;
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
          ></span>

          {/* Current character  */}
          <span
            style={{
              fontSize: '2rem',
              backgroundColor: color,
              textDecoration: 'underline',
              userSelect: 'none',
            }}
          ></span>

          {/* Have not reached yet */}
          <span style={{ fontSize: '2rem', userSelect: 'none' }}>{sample}</span>
        </div>
      </div>
    </div>
  );
}

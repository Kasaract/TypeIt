import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { STATECODE, STATUSCOLOR } from '../../constants';

export default function TypingText() {
  const words = useSelector((state) => state.words);
  const position = useSelector((state) => state.position);
  const inputStatus = useSelector((state) => state.inputStatus);

  // const dispatch = useDispatch();

  let color;

  if (inputStatus !== STATECODE.INCORRECT) {
    color = STATUSCOLOR.CURRENT;
  } else if (inputStatus === STATECODE.INCORRECT) {
    color = STATUSCOLOR.INCORRECT;
  }

  useEffect(() => {
    // Might need this for keyboardAssist later
    // dispatch({
    //   type: ACTIONS.EVENTLOG,
    //   payload: {
    //     type: 'HINT',
    //     word: words[position],
    //     pinyin,
    //     progress: pinyinAssist,
    //     timeStamp: Date.now(),
    //   },
    // });
  }, []);

  return (
    <>
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
              {words.substring(0, position)}
            </span>

            {/* Current character  */}
            <span
              style={{
                fontSize: '2rem',
                backgroundColor: color,
                fontWeight: 'bold',
                userSelect: 'none',
              }}
            >
              {words[position]}
            </span>

            {/* Have not reached yet */}
            <span style={{ fontSize: '2rem', userSelect: 'none' }}>
              {words.substring(position + 1, words.length)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Overlay, Tooltip } from 'react-bootstrap';

import { STATECODE, STATUSCOLOR } from '../../constants';
import { ACTIONS } from '../../actions';

import { Pinyin } from '../../languages/Chinese/Pinyin';

export default function ChineseTypingText() {
  const words = useSelector((state) => state.words);
  const position = useSelector((state) => state.position);
  const inputStatus = useSelector((state) => state.inputStatus);
  const pinyinAssist = useSelector((state) => state.pinyinAssist);

  const dispatch = useDispatch();

  const target = useRef(null);

  const [hint, setHint] = useState([]);

  let color;

  if (inputStatus !== STATECODE.INCORRECT) {
    color = STATUSCOLOR.CURRENT;
  } else if (inputStatus === STATECODE.INCORRECT) {
    color = STATUSCOLOR.INCORRECT;
  }

  useEffect(() => {
    if (position < words.length) {
      let pinyin = Pinyin[words[position]]['pinyin'];
      let word =
        pinyin.substring(0, pinyinAssist) + '_'.repeat(pinyin.length - pinyinAssist);
      word = word.split('').join(' ');
      // let timeStamp = Date.now();
      setHint(word);
      if (pinyinAssist > 0) {
        dispatch({
          type: ACTIONS.EVENTLOG,
          payload: {
            type: 'HINT',
            word: words[position],
            pinyin,
            progress: pinyinAssist,
            timeStamp: Date.now(),
          },
        });
      }
    }
  }, [position, pinyinAssist, dispatch, words]);

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
              ref={target}
              style={{
                fontSize: '2rem',
                backgroundColor: color,
                fontWeight: 'bold',
                userSelect: 'none',
              }}
            >
              {words[position]}
              {words[position] in Pinyin && (
                <Overlay
                  target={target.current}
                  show={pinyinAssist > 0}
                  placement="top-end"
                  transition={false}
                >
                  <Tooltip>
                    <div style={{ fontSize: '1.25rem' }}>
                      {/* {Pinyin[words[position]].substring(0, pinyinAssist) +
                        '_'.repeat(Pinyin[words[position]].length - pinyinAssist)} */}
                      {hint}
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: hint.includes('_') ? 'white' : 'black',
                      }}
                    >
                      {"Press '=' for more hints"}
                    </div>
                  </Tooltip>
                </Overlay>
              )}
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

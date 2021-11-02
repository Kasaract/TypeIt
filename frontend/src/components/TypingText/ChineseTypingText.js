import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Overlay, Tooltip } from 'react-bootstrap';

// import { WordsContext, InputStatusContext } from '../../context';

import { STATECODE, STATUSCOLOR } from '../../constants';

import { Pinyin } from '../../languages/Chinese/Pinyin';

export default function ChineseTypingText({ pinyinAssist }) {
  // const { words, wordIndex } = useContext(WordsContext);
  // const { inputStatus } = useContext(InputStatusContext);
  const words = useSelector((state) => state.words);
  const wordIndex = useSelector((state) => state.wordIndex);
  const inputStatus = useSelector((state) => state.inputStatus);

  const target = useRef(null);

  const currentWord = words[wordIndex];

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
            {words.slice(0, wordIndex).join('')}
          </span>

          {/* Current character  */}
          <span
            ref={target}
            style={{
              fontSize: '2rem',
              backgroundColor: color,
              textDecoration: 'underline',
              userSelect: 'none',
            }}
          >
            {words[wordIndex]}
            {currentWord in Pinyin && (
              <Overlay
                target={target.current}
                show={pinyinAssist}
                placement="top-end"
              >
                <Tooltip>{Pinyin[currentWord]}</Tooltip>
              </Overlay>
            )}
          </span>

          {/* Have not reached yet */}
          <span style={{ fontSize: '2rem', userSelect: 'none' }}>
            {words.slice(wordIndex + 1).join('')}
          </span>
        </div>
      </div>
    </div>
  );
}

import { useContext, useRef } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';

import { WordsContext, InputStatusContext } from '../../context';

import { STATECODE, STATUSCOLOR } from '../../constants';

import { Pinyin } from '../../languages/Chinese/Pinyin';

export default function ChineseTypingText({ text, pinyinAssist }) {
  const { words, wordIndex } = useContext(WordsContext);
  const { inputStatus } = useContext(InputStatusContext);

  const target = useRef(null);

  let color;

  if (inputStatus !== STATECODE.INCORRECT) {
    color = STATUSCOLOR.CURRENT;
  } else if (inputStatus === STATECODE.INCORRECT) {
    color = STATUSCOLOR.INCORRECT;
  }

  const currentWord = words[wordIndex];

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
            {text.slice(0, wordIndex).join('')}
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
            {text[wordIndex]}
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
            {text.slice(wordIndex + 1).join('')}
          </span>
        </div>
      </div>
    </div>
  );
}

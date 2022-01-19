// Diff match patch

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editable, Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
// import { FormControl } from 'react-bootstrap';

import { STATECODE, STATUSCOLOR } from '../../constants';
import { ACTIONS } from '../../actions';

export default function Input({ onCompleted }) {
  const start = useSelector((state) => state.start);
  const model = useSelector((state) => state.model);
  const words = useSelector((state) => state.words);
  const position = useSelector((state) => state.position);
  const charPosition = useSelector((state) => state.charPosition);
  const input = useSelector((state) => state.input);
  const inputStatus = useSelector((state) => state.inputStatus);
  // const pinyinAssist = useSelector((state) => state.pinyinAssist);
  const pinyinAssistMessage = useSelector((state) => state.pinyinAssistMessage);
  const pinyinAssistDelay = useSelector((state) => state.pinyinAssistDelay);
  const eventLog = useSelector((state) => state.eventLog);

  const [editor] = useState(() => withReact(createEditor()));

  const dispatch = useDispatch();

  const inputBox = useRef();

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    // if (start) {
    //   interval = setInterval(() => {
    //     setTimer((time) => time + 1);
    //     if (timer > pinyinAssistDelay && !pinyinAssistMessage) {
    //       dispatch({
    //         type: ACTIONS.PINYINASSISTMESSAGE,
    //         // payload: { type: 'PINYINASSIST', input: words[position] },
    //       });
    //     }
    //   }, 1000);
    // } else {
    //   clearInterval(interval);
    // }

    return () => clearInterval(interval);
  }, [
    start,
    timer,
    words,
    position,
    pinyinAssistMessage,
    pinyinAssistDelay,
    dispatch,
  ]);

  const onInputChange = (e) => {
    // Consider moving this to onInputChange to augment more data
    // const { timeStamp } = e.nativeEvent;
    const timeStamp = 0;
    // const inputState = inputBox.current.innerText;
    const inputState = e;
    console.log('Current input state', inputState);

    if (!start) {
      dispatch({
        type: ACTIONS.START,
        payload: {
          type: 'START',
          timeStamp,
        },
      });
    }

    // dispatch({
    //   type: ACTIONS.EVENTLOG,
    //   payload: {
    //     type: 'INPUT STATE',
    //     input: inputState,
    //     timeStamp,
    //   },
    // });

    // onKeyDown();

    model.onInputChange(
      inputState,
      timeStamp,
      inputStatus,
      position,
      charPosition,
      words,
      onCompleted,
      setTimer,
      dispatch
    );
    // console.log(eventLog);
  };

  const lastChar = new RegExp("[0-9a-zA-Z']");

  const onKeyDown = (e) => {
    const { code, shiftKey, timeStamp } = e.nativeEvent;
    if (
      e.code === 'Backspace' &&
      inputStatus === STATECODE.READY &&
      !lastChar.test(e.target.value.charAt(input.length - 1))
    ) {
      e.preventDefault();
    } else if (e.code === 'Equal') {
      dispatch({
        type: ACTIONS.PINYINASSISTHINT,
        payload: { timeStamp },
      });
      console.log(eventLog);
      e.preventDefault();
    } else {
      dispatch({
        type: ACTIONS.EVENTLOG,
        payload: {
          type: 'KEYSTROKE',
          code,
          shiftKey,
          timeStamp,
        },
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center px-5 flex-column">
      {/* <input
        type="text"
        style={{
          border: '.15rem solid #636363',
          borderRadius: '0.5rem',
          fontFamily: 'Roboto',
          fontSize: '2rem',
          backgroundColor: inputStatus === STATECODE.INCORRECT && '#faa7a7',
        }}
        className="px-3 w-100"
        value={input}
        onChange={(e) => onInputChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
      /> */}
      <h3>{input}</h3>
      {/* {console.log('INPUT', input.split(''))} */}
      {/* <div
        contentEditable
        ref={inputBox}
        style={{
          border: '.15rem solid #636363',
          borderRadius: '0.5rem',
          fontFamily: 'Roboto',
          fontSize: '2rem',
          // backgroundColor: inputStatus === STATECODE.INCORRECT && '#faa7a7',
        }}
        className="px-3 w-100"
        onInput={(e) => onInputChange(e)}
      >
        {input.split('').map((char, i) => {
          if (lastChar.test(char) || inputStatus !== STATECODE.INCORRECT) {
            return <span>{char}</span>;
          } else {
            return (
              <span
                style={{
                  backgroundColor:
                    words.charAt(i) === char
                      ? STATUSCOLOR.CORRECT
                      : STATUSCOLOR.INCORRECT,
                }}
              >
                {char}
              </span>
            );
          }
        })}
      </div> */}

      <Slate
        editor={editor}
        value={[{ type: 'paragraph', children: [{ text: input }] }]}
        onChange={(e) => onInputChange(e[0].children[0].text)} // Parse out the desired text
      >
        <Editable
          className="px-3 w-100"
          style={{
            border: '.15rem solid #636363',
            borderRadius: '0.5rem',
            fontFamily: 'Roboto',
            fontSize: '2rem',
            // backgroundColor: inputStatus === STATECODE.INCORRECT && '#faa7a7',
          }}
        />
      </Slate>
    </div>
  );
}

// Notes -
//  - Hint is peripheral
//  - Over the shoulder test
//   - Not clear that you can press hint more than once
//   - Add to pop-up?
//   - ask what they're thinking

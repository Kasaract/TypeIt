// Diff match patch

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editable, Slate, withReact } from 'slate-react';
import { Transforms, createEditor, Text } from 'slate';

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

  // const Leaf = ({ attributes, children, leaf }) => {
  //   if (inputStatus === STATECODE.INCORRECT) {
  //     return (
  //       <span
  //         {...attributes}
  //         style={{
  //           backgroundColor:
  //             leaf.correct === true ? STATUSCOLOR.INCORRECT : STATUSCOLOR.CORRECT,
  //         }}
  //       >
  //         {children}
  //       </span>
  //     );
  //   }

  //   return <span {...attributes}>{children}</span>;
  // };

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
    console.log('onInputChange', e);
    // Consider moving this to onInputChange to augment more data
    const timeStamp = 0;
    const inputState = e;

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
      <Slate
        editor={editor}
        value={[{ type: 'paragraph', children: [{ text: '' }] }]} // Input is array of leaves
        onChange={(e) => {
          console.log('onChange', e);
          onInputChange(e[0].children[0].text);
        }} // Most recent character gets added to last leaf
      >
        <Editable
          autoFocus
          className="px-3 w-100"
          style={{
            border: '.15rem solid #636363',
            borderRadius: '0.5rem',
            fontFamily: 'Roboto',
            fontSize: '2rem',
            backgroundColor: inputStatus === STATECODE.INCORRECT && '#faa7a7',
          }}
          onKeyDown={(e) => {
            if (inputStatus === STATECODE.READY && e.key === 'Backspace') {
              e.preventDefault();
            }

            // This is a hack since there is a delay by 1 state change in SlateJS
            // Would be preferred if there was a way to not handle state change in
            // onKeyDown
            if (
              e.key === 'Backspace' &&
              words.substring(0, position) ===
                input.replace(/\uFEFF/g, '').slice(0, -1)
            ) {
              dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
            }
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

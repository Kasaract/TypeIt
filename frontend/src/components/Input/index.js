// Diff match patch

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editable, Slate, withReact } from 'slate-react';
import { Text, createEditor } from 'slate';

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
  const time = useSelector((state) => state.time);
  // const pinyinAssist = useSelector((state) => state.pinyinAssist);
  // const pinyinAssistMessage = useSelector((state) => state.pinyinAssistMessage);
  // const pinyinAssistDelay = useSelector((state) => state.pinyinAssistDelay);
  // const eventLog = useSelector((state) => state.eventLog);

  const [editor] = useState(() => withReact(createEditor()));

  const Leaf = ({ attributes, children, leaf }) => {
    return (
      <span
        {...attributes}
        style={{
          backgroundColor:
            inputStatus === STATECODE.INCORRECT
              ? leaf.correct //&& inputStatus === STATECODE.INCORRECT
                ? STATUSCOLOR.CORRECT
                : STATUSCOLOR.INCORRECT
              : STATUSCOLOR.IDLE,
        }}
      >
        {children}
      </span>
    );
  };

  const decorate = useCallback(
    ([node, path]) => {
      const ranges = [];
      if (inputStatus === STATECODE.INCORRECT && Text.isText(node)) {
        const { text } = node;
        const characters = text.replace(/\uFEFF/g, '').split(''); // Removes empty character at beginning

        for (let i = 0; i < characters.length; i++) {
          ranges.push({
            anchor: { path, offset: i },
            focus: { path, offset: i + 1 },
            correct: characters[i] === words[i - 1],
          });
        }
      }
      return ranges;
    },
    [inputStatus, words]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;
    let lastUpdateTime = Date.now();
    if (start) {
      interval = setInterval(() => {
        const now = Date.now();
        const deltaTime = now - lastUpdateTime;
        lastUpdateTime = now;
        dispatch({ type: ACTIONS.UPDATETIME, payload: deltaTime });
        console.log(time);
        if (time < 500) {
          clearInterval(interval);
          dispatch({ type: ACTIONS.END });
          return;
        }
      }, 500);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start, time, dispatch]);

  const onInputChange = (e) => {
    // Consider moving this to onInputChange to augment more data
    const timeStamp = 0;
    const inputState = e;

    // dispatch({
    //   type: ACTIONS.EVENTLOG,
    //   payload: {
    //     type: 'INPUT STATE',
    //     input: inputState,
    //     timeStamp,
    //   },
    // });

    model.onInputChange(
      inputState,
      timeStamp,
      inputStatus,
      position,
      charPosition,
      words,
      onCompleted,
      dispatch
    );
    // console.log(eventLog);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !start) {
      e.preventDefault();
      dispatch({
        type: ACTIONS.START,
        payload: {
          // timeStamp,
        },
      });
      return;
    }

    if (start) {
      if (inputStatus === STATECODE.READY && e.key === 'Backspace') {
        e.preventDefault();
      }

      // -- DOESN'T WORK ---
      // When status is incorrect and user types more characters, the input always
      // gets truncated to size 2, and I have no idea why.
      // else if (inputStatus === STATECODE.INCORRECT && e.key !== 'Backspace') {
      //   console.log('SHOULD BE HERE!');
      //   e.preventDefault();
      // }

      // This is a hack since there is a delay by 1 state change in SlateJS
      // Would be preferred if there was a way to not handle state change in
      // onKeyDown
      else if (
        e.key === 'Backspace' &&
        words.substring(0, position) === input.replace(/\uFEFF/g, '').slice(0, -1)
      ) {
        dispatch({ type: ACTIONS.INPUTSTATUS, payload: STATECODE.READY });
      } else if (e.key === '=') {
        e.preventDefault();
        dispatch({
          type: ACTIONS.PINYINASSISTHINT,
        });
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center px-5 flex-column">
      {start}
      <Slate
        editor={editor}
        value={[{ type: 'paragraph', children: [{ text: '' }] }]} // Input is array of leaves
        onChange={(e) => {
          onInputChange(e[0].children[0].text);
        }} // Most recent character gets added to last leaf
      >
        <Editable
          autoFocus
          readOnly={!start}
          className="px-3 w-100"
          style={{
            border: '.15rem solid #636363',
            borderRadius: '0.5rem',
            fontFamily: 'Roboto',
            fontSize: '2rem',
          }}
          decorate={decorate}
          renderLeaf={(props) => <Leaf {...props} />}
          onKeyDown={onKeyDown}
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

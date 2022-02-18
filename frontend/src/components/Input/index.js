// Diff match patch

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editable, Slate, withReact } from 'slate-react';
import { Text, createEditor } from 'slate';
import { useHotkeys } from 'react-hotkeys-hook';

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
  // const eventLog = useSelector((state) => state.eventLog);

  const [editor] = useState(() => withReact(createEditor()));

  const dispatch = useDispatch();

  useHotkeys('enter', () => {
    dispatch({
      type: ACTIONS.START,
      payload: {
        // timeStamp,
      },
    });
  });

  const Leaf = ({ attributes, children, leaf }) => {
    return (
      <span
        {...attributes}
        style={{
          backgroundColor:
            inputStatus === STATECODE.INCORRECT
              ? leaf.correct
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

      if (Text.isText(node)) {
        const { text } = node;
        const parts = text.split('');
        let offset = 0;
        let wordIndex = 0;

        parts.forEach((part, i) => {
          if (part.charCodeAt(0) === 65279) {
            ranges.push({
              anchor: { path, offset: offset },
              focus: { path, offset: offset + 1 },
              correct: true,
            });
          } else {
            ranges.push({
              anchor: { path, offset: offset },
              focus: { path, offset: offset + 1 },
              correct: part === words[wordIndex],
            });
            wordIndex++;
          }

          offset = offset + 1;
        });
      }

      return ranges;
    },
    [words]
  );

  useEffect(() => {
    let interval = null;
    let lastUpdateTime = Date.now();
    if (start) {
      interval = setInterval(() => {
        const now = Date.now();
        const deltaTime = now - lastUpdateTime;
        lastUpdateTime = now;
        dispatch({ type: ACTIONS.UPDATETIME, payload: deltaTime }); // Clearing input bug happening here! (Non deterministic?)
        //   console.log(time);
        //   if (time < 500) {
        //     clearInterval(interval);
        //     dispatch({ type: ACTIONS.END });
        //     return;
        //   }
      }, 500);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, []);

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
    }
    if (start) {
      if (inputStatus === STATECODE.READY && e.key === 'Backspace') {
        e.preventDefault();
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
      {start ? 'true ' : 'false '}
      {inputStatus}
      <Slate
        editor={editor}
        value={[{ type: 'paragraph', children: [{ text: '' }] }]} // Input is array of leaves
        onChange={(e) => {
          onInputChange(e[0].children[0].text);
        }} // Most recent character gets added to last leaf
      >
        <Editable
          autoFocus={start}
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

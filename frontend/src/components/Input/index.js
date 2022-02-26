// Diff match patch

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editable, Slate, withReact } from 'slate-react';
import { Text, Transforms, Editor, createEditor } from 'slate';
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
  const eventLog = useSelector((state) => state.eventLog);

  // const [editor] = useState(() => withReact(createEditor()));
  const [editor] = useState(() => withReact(createEditor()));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_RESETINPUT,
      payload: () => {
        Transforms.delete(editor, {
          at: {
            anchor: Editor.start(editor, []),
            focus: Editor.end(editor, []),
          },
        });
      },
    });
  }, [editor]);

  // useHotkeys('enter', () => {
  //   let now = Date.now();
  //   // toggleTime();
  //   dispatch({
  //     type: ACTIONS.START,
  //     payload: {
  //       timeStamp: now,
  //     },
  //   });
  // });

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
    // Maybe copy over the Slate example. It's cleaner code.
    ([node, path]) => {
      const ranges = [];

      if (Text.isText(node)) {
        const { text } = node;
        const parts = text.split('');
        let offset = 0;
        let wordIndex = 0;

        parts.forEach((part) => {
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

  const onInputChange = (e) => {
    const timeStamp = Date.now();
    const inputState = e;

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
    console.log(eventLog);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !start) {
      e.preventDefault();
      dispatch({
        type: ACTIONS.START,
        payload: {
          type: 'START',
          timeStamp: Date.now(),
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
      } else {
        dispatch({
          type: ACTIONS.EVENTLOG,
          payload: {
            type: 'INPUT',
            input: e.key,
            timeStamp: Date.now(),
          },
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
        value={[
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ]} // Input is array of leaves
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

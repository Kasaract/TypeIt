// Diff match patch

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl } from 'react-bootstrap';

import { STATECODE } from '../../constants';
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

  const dispatch = useDispatch();

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
        if (timer > pinyinAssistDelay && !pinyinAssistMessage) {
          dispatch({
            type: ACTIONS.PINYINASSISTMESSAGE,
            // payload: { type: 'PINYINASSIST', input: words[position] },
          });
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

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
    const { data, timeStamp } = e.nativeEvent;

    if (!start) {
      dispatch({
        type: ACTIONS.START,
        payload: {
          type: 'START',
          timeStamp,
        },
      });
    }

    dispatch({
      type: ACTIONS.EVENTLOG,
      payload: {
        type: 'INPUT STATE',
        input: data,
        timeStamp,
      },
    });

    model.onInputChange(
      e.target.value,
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

  const lastChar = new RegExp("[0-9a-zA-Z']", 'g');

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
    <div className="d-flex justify-content-center align-items-center px-5 pt-5">
      <FormControl
        style={{
          border: '.15rem solid #636363',
          borderRadius: '0.5rem',
          fontFamily: 'Roboto',
          fontSize: '2rem',
          backgroundColor: inputStatus === STATECODE.INCORRECT && '#faa7a7',
        }}
        className="px-3"
        value={input}
        onChange={(e) => onInputChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        aria-label="Username"
      />
    </div>
  );
}

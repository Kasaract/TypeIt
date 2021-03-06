import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Transforms, Editor } from 'slate';
import axios from 'axios';
import { useHotkeys } from 'react-hotkeys-hook';
import jwt from 'jsonwebtoken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import { getNewExcerpt } from '../../reducers/getNewExcerpt';

import { ACTIONS } from '../../actions';

export default function CompletedModal({ editor, show, time }) {
  const eventLog = useSelector((state) => state.eventLog);
  const words = useSelector((state) => state.words);
  const errorPositions = useSelector((state) => state.errorPositions);
  const hintCount = useSelector((state) => state.hintCount);
  const language = useSelector((state) => state.language);
  const completed = useSelector((state) => state.completed);

  const dispatch = useDispatch();

  useHotkeys('enter', () => {
    onNewExcerpt();
  });

  useHotkeys('r', () => {
    onPracticeAgain();
  });

  const [stats, setStats] = useState({
    speed: '0',
    time: '0',
    accuracy: '100',
    numHints: 0,
  });

  useEffect(() => {
    if (eventLog.length > 0) {
      let speed, time, accuracy, numHints;

      const startTime = eventLog.at(0).timeStamp;
      const endTime = eventLog.at(-1).timeStamp;
      time = Math.round((endTime - startTime) / 1000);
      const min = Math.floor(time / 60);
      let sec = time;
      sec = min > 0 ? time - min * 60 : sec;
      sec = sec < 10 ? '0' + sec : sec;

      speed = Math.round(words.length / (time / 60)) + ' cpm';
      time = min + ':' + sec;
      accuracy =
        Math.round(((words.length - errorPositions.length) * 100) / words.length) +
        '%';
      numHints = hintCount;

      setStats({ speed, time, accuracy, numHints });
    }
  }, [eventLog, words, errorPositions, hintCount]);

  useEffect(() => {
    if (completed) {
      const token = localStorage.getItem('token');
      const username = jwt.decode(token).username;
      axios
        .post('/api/eventlog', {
          username,
          language,
          events: eventLog,
        })
        .then((res) => console.log(res));
      console.log(eventLog);
    }
  }, [completed, eventLog, language]);

  // const labelDescriptions = [
  //   'Excerpt length / Time elapsed',
  //   'Time elapsed',
  //   'Correct char typed / Total number of char typed',
  //   'Num of assisted chars',
  // ];

  const resetInput = () => {
    if (language === 'ZH') {
      // Can only reset SlateJS if language checker uses Slate.
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      });
    }
  };

  const onPracticeAgain = () => {
    resetInput();
    dispatch({
      type: ACTIONS.RESET,
    });
  };

  const onNewExcerpt = () => {
    resetInput();
    const getNewExcerptThunk = getNewExcerpt(language);
    dispatch(getNewExcerptThunk);
  };

  const onHide = () => {
    dispatch({ type: ACTIONS.RESET });
    resetInput();
  };

  return (
    <Modal
      show={show}
      // time={time}
      onHide={() => {
        onHide();
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h3">Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex ms-3 mb-3">
          <div className="me-3">
            {['Speed:', 'Time:', 'Accuracy:', 'Number of Hints:'].map((label, i) => (
              <h5 key={i}>{label}</h5>
            ))}
          </div>
          <div className="me-5">
            {Object.values(stats).map((value, i) => (
              <h5 key={i}>{value}</h5>
            ))}
          </div>
          <div className="d-flex flex-column">
            {Object.values(stats).map((desc, i) => (
              <div key={i} className="w-100 mb-2" style={{ height: '1.50rem' }}>
                <FontAwesomeIcon
                  key={i}
                  icon={faCircleQuestion}
                  style={{ color: '#b0b0b0' }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-end">
          {/* <Button
            onClick={() => navigator.clipboard.writeText(JSON.stringify(eventLog))}
            size="sm"
            // onClick={() => postEventLog()}
          >
            Submit Event Log
          </Button> */}
          <Button
            className="me-3"
            variant="outline-primary"
            size="sm"
            onClick={() => onPracticeAgain()}
          >
            <h6 className="mb-1">Repeat Excerpt</h6>
            <div style={{ fontSize: '0.75rem' }}>(Press R)</div>
          </Button>
          <Button size="sm" onClick={() => onNewExcerpt()}>
            <h6 className="mb-1">New Excerpt</h6>
            <div style={{ fontSize: '0.75rem' }}>(Press Enter)</div>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

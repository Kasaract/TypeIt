import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { getNewExcerpt } from '../../reducers/getNewExcerpt';

import { ACTIONS } from '../../actions';

export default function CompletedModal({ show, time }) {
  const eventLog = useSelector((state) => state.eventLog);
  const resetInput = useSelector((state) => state.resetInput);
  const words = useSelector((state) => state.words);
  const errorPositions = useSelector((state) => state.errorPositions);
  const hintCount = useSelector((state) => state.hintCount);
  const language = useSelector((state) => state.language);

  const dispatch = useDispatch();

  const [stats, setStats] = useState({
    speed: 'a',
    time: 'b',
    accuracy: 'c',
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
      console.log(words);
      console.log('Error', errorPositions);
      accuracy =
        Math.round(((words.length - errorPositions.length) * 100) / words.length) +
        '%';
      numHints = hintCount;

      setStats({ speed, time, accuracy, numHints });
    }
  }, [eventLog, words, errorPositions, hintCount]);

  // const postEventLog = async () => {
  //   await axios
  //     .post('http://localhost:4000/eventlog', { events: eventLog })
  //     .then((res) => console.log(res));
  // };

  const onPracticeAgain = () => {
    resetInput();
    dispatch({
      type: ACTIONS.RESET,
    });
  };

  const onNewExcerpt = () => {
    const getNewExcerptThunk = getNewExcerpt(language);
    dispatch(getNewExcerptThunk);
    resetInput();
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
        <Modal.Title>Congrats, you've reached the end!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <div className="d-flex ms-3 my-3">
          <div className="me-5">
            {['Speed:', 'Time:', 'Accuracy:', 'Number of Hints:'].map((label, i) => (
              <h5 key={i}>{label}</h5>
            ))}
          </div>
          <div>
            {Object.values(stats).map((value, i) => (
              <h5 key={i}>{value}</h5>
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
            Repeat Excerpt
          </Button>
          <Button size="sm" onClick={() => onNewExcerpt()}>
            Do Another Excerpt
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

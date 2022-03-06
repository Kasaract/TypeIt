import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { getNewExcerpt } from '../../reducers/getNewExcerpt';

import { ACTIONS } from '../../actions';

export default function CompletedModal({ show, time, onHide }) {
  const eventLog = useSelector((state) => state.eventLog);
  const resetInput = useSelector((state) => state.resetInput);
  const language = useSelector((state) => state.language);

  const dispatch = useDispatch();

  const postEventLog = async () => {
    await axios
      .post('http://localhost:4000/eventlog', { events: eventLog })
      .then((res) => console.log(res));
  };

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
      <Modal.Body className="d-flex justify-content-between p-3">
        <Button
          onClick={() => navigator.clipboard.writeText(JSON.stringify(eventLog))}
          size="sm"
          // onClick={() => postEventLog()}
        >
          Submit Event Log
        </Button>
        <div>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onPracticeAgain()}
          >
            Practice Again
          </Button>
          <Button size="sm" onClick={() => onNewExcerpt()}>
            New Excerpt
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function CompletedModal({ show, time, onHide }) {
  const eventLog = useSelector((state) => state.eventLog);

  const postEventLog = async () => {
    await axios
      .post('http://localhost:4000/eventlog', { events: eventLog })
      .then((res) => console.log(res));
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
        <Modal.Title>Completed Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Congrats, you've reached the end!
        <button
          // onClick={() => navigator.clipboard.writeText(JSON.stringify(eventLog))}
          onClick={() => postEventLog()}
        >
          Submit Event Log
        </button>
      </Modal.Body>
    </Modal>
  );
}

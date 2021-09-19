import { Modal } from 'react-bootstrap';

export default function CompletedModal({ show, time, onHide }) {
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
      <Modal.Body>Congrats, you've reached the end! Time: {Math.floor(time / 60000) +
            ':' +
            (Math.floor(time / 1000) % 60) +
            '.' +
            (time % 1000)}</Modal.Body>
    </Modal>
  );
}

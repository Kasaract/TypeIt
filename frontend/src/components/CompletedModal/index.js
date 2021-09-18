import { Modal } from 'react-bootstrap';

export default function CompletedModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Completed Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>Congrats, you've reached the end!</Modal.Body>
    </Modal>
  );
}

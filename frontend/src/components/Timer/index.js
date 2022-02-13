import React from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Timer() {
  const time = useSelector((state) => state.time);

  const minute = Math.max(Math.floor(time / 60000), 0).toString(); // An off-by-1 state change that makes minute negative
  const sec = Math.max(Math.floor(time / 1000) % 60, 0); // Same here

  const secString = sec > 9 ? sec.toString() : '0' + sec.toString();

  return (
    <Row className="d-flex justify-content-end mt-5 mb-3 px-5">
      <h1 className="text-end" style={{ color: '#969696' }}>
        {minute + ':' + secString}
      </h1>
    </Row>
  );
}

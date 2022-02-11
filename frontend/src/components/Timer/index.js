import React from 'react';
import { useSelector } from 'react-redux';

export default function Timer() {
  const time = useSelector((state) => state.time);

  const minute = Math.max(Math.floor(time / 60000), 0).toString(); // An off-by-1 state change that makes minute negative
  const sec = Math.max(Math.floor(time / 1000) % 60, 0); // Same here

  const secString = sec > 10 ? sec.toString() : '0' + sec.toString();

  return (
    <div>
      <h1>{minute + ':' + secString}</h1>
    </div>
  );
}

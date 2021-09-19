import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function Timer({ time, setTime, timeRunning, setTimeRunning }) {
  useEffect(() => {
    if (timeRunning === true) {
      setInterval(() => {
        setTime((time) => time + 25);
      }, 25);
    }
  }, [timeRunning, setTime]);

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setTimeRunning(true);
          }}
        >
          Start Timer
        </Button>
        <h1>
          {Math.floor(time / 60000) +
            ':' +
            (Math.floor(time / 1000) % 60) +
            '.' +
            (time % 1000)}
        </h1>
      </div>
    </>
  );
}

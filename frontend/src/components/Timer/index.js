import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';

export default function Timer({ time, setTime, timeRunning }) {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (timeRunning === true) {
      setTimer(
        (timer) =>
          (timer = setInterval(() => {
            setTime((time) => time + 25);
          }, 25))
      );
    } else {
      clearInterval(timer);
    }
  }, [timer, timeRunning, setTime]);

  return (
    <div>
      <h1>
        {Math.floor(time / 60000) +
          ':' +
          (Math.floor(time / 1000) % 60) +
          '.' +
          (time % 1000)}
      </h1>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Timer({ time, setTime, timeRunning, setTimeRunning }) {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    console.log(timeRunning);
    if (timeRunning === true) {
      setTimer((timer) => 
        timer = setInterval(() => {
          setTime((time) => time + 25);
      }, 25));
      console.log(timer);
    }
    else {
      console.log("STOP PLZ");
      console.log(timer);
      clearInterval(timer);
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Routes from './Routes';
import {
  TimerContext,
  LanguageContext,
  PositionContext,
  CharPositionContext,
  InputContext,
  WordsContext,
  InputStatusContext,
  TimeRunningConext,
} from './context';

import { STATECODE } from './constants';

function App() {
  const [time, setTime] = useState(0);
  const [timeRunning, setTimeRunning] = useState(false);
  const [language, setLanguage] = useState('en');
  const [position, setPosition] = useState(0);
  const [charPosition, setCharPosition] = useState(0);
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [inputStatus, setInputStatus] = useState(STATECODE.READY);

  useEffect(() => {
    setWords('This is a sample text in English'.split(' '));
    // axios
    //   .get('http://localhost:4000/sampletext/' + language.toUpperCase())
    //   .then((response) => {
    //     console.log(response);
    //     setWords(response.data.text.split(' '));
    //     setPosition(0);
    //     setCharPosition(0);
    //     setInput('');
    //     setWordIndex(0);
    //     setInputStatus(STATECODE.READY);
    //   });
  }, [language]);

  return (
    <TimeRunningConext.Provider value={{ timeRunning, setTimeRunning }}>
      <TimerContext.Provider value={{ time, setTime }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <PositionContext.Provider value={{ position, setPosition }}>
            <CharPositionContext.Provider value={{ charPosition, setCharPosition }}>
              <InputContext.Provider value={{ input, setInput }}>
                <WordsContext.Provider value={{ words, wordIndex, setWordIndex }}>
                  <InputStatusContext.Provider value={{ inputStatus, setInputStatus }}>
                    <Routes />
                  </InputStatusContext.Provider>
                </WordsContext.Provider>
              </InputContext.Provider>
            </CharPositionContext.Provider>
          </PositionContext.Provider>
        </LanguageContext.Provider>
      </TimerContext.Provider>
    </TimeRunningConext.Provider>
  );
}

export default App;

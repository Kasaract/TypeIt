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
  ModelContext,
} from './context';

import { STATECODE } from './constants';
import { models, modelGroups } from './components/Input/models';

function App() {
  const [time, setTime] = useState(0);
  const [timeRunning, setTimeRunning] = useState(false);
  const [language, setLanguage] = useState('en');
  const [model, setModel] = useState(models.modelOne);
  const [position, setPosition] = useState(0);
  const [charPosition, setCharPosition] = useState(0);
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [inputStatus, setInputStatus] = useState(STATECODE.READY);

  useEffect(() => {
    // Update typing model
    for (const model in modelGroups) {
      if (modelGroups[model].includes(language.toUpperCase())) {
        setModel(modelGroups[model]);
        // setWords(modelPreprocessing[model](text));
        break;
      }
    }

    // Update typing text
    setWords('This is a sample text in English'.split(' '));
    axios
      .get('http://localhost:4000/sampletext/' + language.toUpperCase())
      .then((response) => {
        setWords(response.data.text.split(' '));
        setPosition(0);
        setCharPosition(0);
        setInput('');
        setWordIndex(0);
        setInputStatus(STATECODE.READY);
      });
  }, [language]);

  return (
    <TimeRunningConext.Provider value={{ timeRunning, setTimeRunning }}>
      <TimerContext.Provider value={{ time, setTime }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <PositionContext.Provider value={{ position, setPosition }}>
            <CharPositionContext.Provider value={{ charPosition, setCharPosition }}>
              <InputContext.Provider value={{ input, setInput }}>
                <WordsContext.Provider value={{ words, wordIndex, setWordIndex }}>
                  <InputStatusContext.Provider
                    value={{ inputStatus, setInputStatus }}
                  >
                    <ModelContext.Provider value={{ model, setModel }}>
                      <Routes />
                    </ModelContext.Provider>
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

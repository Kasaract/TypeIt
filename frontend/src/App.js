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
  TimeRunningContext,
  ModelContext,
  ErrorCountContext,
  // AssistContext,
} from './context';

import { STATECODE } from './constants';
import { models, modelGroups } from './components/Input/models';

const sampleChinese = [
  '这',
  '是',
  '英文',
  '的',
  '示例',
  '文本',
  '。',
  ' ',
  '我',
  '是',
  '一个',
  '打字',
  '程序',
  '，',
  '旨',
  '在',
  '帮助',
  '您',
  '学习',
  '如何',
  '打字',
  '。',
];

const sampleBraile =
  '⠠⠞⠓⠊⠎ ⠊⠎ ⠁ ⠎⠁⠍⠏⠇⠑ ⠞⠑⠭⠞ ⠊⠝ ⠠⠑⠝⠛⠇⠊⠎⠓⠲ ⠠⠊ ⠁⠍ ⠁ ⠞⠽⠏⠊⠝⠛ ⠏⠗⠕⠛⠗⠁⠍ ⠊⠝⠞⠑⠝⠙⠑⠙ ⠞⠕ ⠓⠑⠇⠏ ⠽⠕⠥ ⠇⠑⠁⠗⠝ ⠓⠕⠺ ⠞⠕ ⠞⠽⠏⠑⠲';

const sampleMorse = [
  '-',
  '....',
  '..',
  '...',
  '/',
  '..',
  '...',
  '/',
  '.-',
  '/',
  '...',
  '.-',
  '--',
  '.--.',
  '.-..',
  '.',
  '/',
  '-',
  '.',
  '-..-',
  '-',
  '/',
  '..',
  '-.',
  '/',
  '.',
  '-.',
  '--.',
  '.-..',
  '..',
  '...',
  '....',
  '.-.-.-',
];

function App() {
  const [time, setTime] = useState(0);
  const [timeRunning, setTimeRunning] = useState(false);
  const [language, setLanguage] = useState('en');
  const [model, setModel] = useState(models.modelThree);
  const [position, setPosition] = useState(0);
  const [charPosition, setCharPosition] = useState(0);
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [inputStatus, setInputStatus] = useState(STATECODE.READY);
  const [errorCount, setErrorCount] = useState(0);
  // const [assist, setAssist] = useState(false);

  useEffect(async () => {
    // Update typing model
    for (const model in modelGroups) {
      if (modelGroups[model].includes(language.toUpperCase())) {
        setModel(models[model]);
        // setWords(models[model].preprocess(sampleMorse));
        // Update typing text
        await axios
          .get('http://localhost:4000/sampletext/' + language.toUpperCase())
          .then((response) => {
            setWords(models[model].preprocess(response.data.text));
            setPosition(0);
            setCharPosition(0);
            setInput('');
            setWordIndex(0);
            setInputStatus(STATECODE.READY);
          });
        break;
      }
    }
  }, [language, model]);

  return (
    <TimeRunningContext.Provider value={{ timeRunning, setTimeRunning }}>
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
                      <ErrorCountContext.Provider
                        value={{ errorCount, setErrorCount }}
                      >
                        {/* <AssistContext.Provider value={{ assist, setAssist }}> */}
                        <Routes />
                        {/* </AssistContext.Provider> */}
                      </ErrorCountContext.Provider>
                    </ModelContext.Provider>
                  </InputStatusContext.Provider>
                </WordsContext.Provider>
              </InputContext.Provider>
            </CharPositionContext.Provider>
          </PositionContext.Provider>
        </LanguageContext.Provider>
      </TimerContext.Provider>
    </TimeRunningContext.Provider>
  );
}

export default App;

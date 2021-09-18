import { useState } from 'react';
import axios from 'axios';

import Routes from './Routes';
import {
  LanguageContext,
  PositionContext,
  CharPositionContext,
  InputContext,
  WordsContext,
  InputStatusContext,
} from './context';

import { STATECODE } from './constants';

const sampleEnglish =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod';

const sampleChinese = '我爱学习';

function App() {
  const [language, setLanguage] = useState('');
  const [position, setPosition] = useState(0);
  const [charPosition, setCharPosition] = useState(0);
  const [input, setInput] = useState('');
  const [words, setWords] = useState(sampleEnglish.split(' '));
  const [wordIndex, setWordIndex] = useState(0);
  const [inputStatus, setInputStatus] = useState(STATECODE.READY);

  console.log(words);
  return (
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
  );
}

export default App;

import { useState } from 'react';

import Routes from './Routes';
import {
  PositionContext,
  CharPositionContext,
  InputContext,
  WordsContext,
  InputStatusContext,
} from './context';

import { STATECODE } from './constants';

const sampleEnglish =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const sampleChinese = '我爱学习';

function App() {
  const [position, setPosition] = useState(0);
  const [charPosition, setCharPosition] = useState(0);
  const [input, setInput] = useState('');
  const [words, setWords] = useState(sampleChinese.split(' '));
  const [wordIndex, setWordIndex] = useState(0);
  const [inputStatus, setInputStatus] = useState(STATECODE.READY);

  console.log(words);
  return (
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
  );
}

export default App;

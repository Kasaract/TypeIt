import { useState } from 'react';

import Routes from './Routes';
import {
  PositionContext,
  InputContext,
  WordsContext,
  InputStatusContext,
} from './context';

import { STATECODE } from './constants';

function App() {
  const [position, setPosition] = useState(0);
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [inputStatus, setInputStatus] = useState(STATECODE.READY);

  return (
    <PositionContext.Provider value={{ position, setPosition }}>
      <InputContext.Provider value={{ input, setInput }}>
        <WordsContext.Provider value={{ words, wordIndex, setWordIndex }}>
          <InputStatusContext.Provider value={{ inputStatus, setInputStatus }}>
            <Routes />
          </InputStatusContext.Provider>
        </WordsContext.Provider>
      </InputContext.Provider>
    </PositionContext.Provider>
  );
}

export default App;

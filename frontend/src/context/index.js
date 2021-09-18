import { createContext } from 'react';

export const LanguageContext = createContext('');
export const PositionContext = createContext(0);
export const CharPositionContext = createContext(0);
export const InputContext = createContext('');
export const WordsContext = createContext({});
export const InputStatusContext = createContext(0);

// <PositionContext.Provider value={{ position, setPosition }}>
// <InputContext.Provider value={{ input, setInput }}>
//   <WordsContext.Provider value={{ words, wordIndex, setWordIndex }}>
//     <InputStatusContext.Provider value={{ inputStatus, setInputStatus }}>

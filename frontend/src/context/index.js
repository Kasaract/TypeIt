import { createContext } from 'react';

export const TimerContext = createContext(0);
export const TimeRunningContext = createContext(false);
export const LanguageContext = createContext('');
export const PositionContext = createContext(0);
export const CharPositionContext = createContext(0);
export const InputContext = createContext('');
export const WordsContext = createContext({});
export const InputStatusContext = createContext(0);
export const ModelContext = createContext();
export const ErrorCountContext = createContext(0);
export const AssistContext = createContext(false);

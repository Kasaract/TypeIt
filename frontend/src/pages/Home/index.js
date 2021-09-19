import { useContext, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import {
  TimerContext,
  LanguageContext,
  PositionContext,
  CharPositionContext,
  InputStatusContext,
  InputContext,
  WordsContext,
  TimeRunningContext,
  ErrorCountContext,
  AssistContext,
  // ModelContext,
} from '../../context';

import Timer from '../../components/Timer';
import LanguageSelect from '../../components/LanguageSelect';
import TypingText from '../../components/TypingText';
import Input from '../../components/Input';
import CompletedModal from '../../components/CompletedModal';
import KeyboardAssist from '../../components/KeyboardAssist';

import ChineseTypingText from '../../components/TypingText/ChineseTypingText';
import MorseCodeTypingText from '../../components/TypingText/MorseCodeTypingText';

import { STATECODE } from '../../constants';

import './Home.css';

export default function Home() {
  const { time, setTime } = useContext(TimerContext);
  const { timeRunning, setTimeRunning } = useContext(TimeRunningContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const { position, setPosition } = useContext(PositionContext);
  const { setCharPosition } = useContext(CharPositionContext);
  const { setInput } = useContext(InputContext);
  const { inputStatus, setInputStatus } = useContext(InputStatusContext);
  const { words, setWordIndex } = useContext(WordsContext);
  const { errorCount, setErrorCount } = useContext(ErrorCountContext);
  const { assist, setAssist } = useContext(AssistContext);
  // const { model } = useContext(ModelContext);

  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const onReset = () => {
    setTimeRunning(false);
    setTime(0);
    setPosition(0);
    setCharPosition(0);
    setWordIndex(0);
    setInput('');
    setInputStatus(STATECODE.READY);
  };

  const onCompleted = () => {
    setShowCompletedModal(true);
  };

  const onCompletedModalExit = () => {
    onReset();
    setShowCompletedModal(false);
  };

  return (
    <Container className="vh-100">
      <Col className="h-100">
        <Row>
          <Col>
            <LanguageSelect
              language={language}
              setLanguage={setLanguage}
              onReset={onReset}
            />
          </Col>
          <Col className="justify-content-end">
            <Timer
              time={time}
              setTime={setTime}
              timeRunning={timeRunning}
              setTimeRunning={setTimeRunning}
            />
          </Col>
        </Row>
        <Row>
          {language === 'zh' ? (
            <ChineseTypingText text={words} />
          ) : language === 'morse' ? (
            <MorseCodeTypingText text={words} />
          ) : (
            <TypingText
              position={position}
              inputStatus={inputStatus}
              text={words.join(' ')}
            />
          )}
        </Row>
        <Row>
          <Input
            onCompleted={onCompleted}
            textLength={language === 'zh' ? words.length : words.join(' ').length}
            position={position}
            setPosition={setPosition}
            inputStatus={inputStatus}
            setInputStatus={setInputStatus}
            errorCount={errorCount}
            setErrorCount={setErrorCount}
            assist={assist}
            setAssist={setAssist}
          />
        </Row>
        <Row
          className={`d-flex justify-content-center px-5 py-3 ${
            errorCount >= 3 ? 'fade-in' : 'fade-out'
          }`}
        >
          {errorCount >= 3 && <KeyboardAssist />}
        </Row>
      </Col>
      <CompletedModal show={showCompletedModal} onHide={onCompletedModalExit} />
    </Container>
  );
}

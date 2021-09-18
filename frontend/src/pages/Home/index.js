import { useContext, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import {
  LanguageContext,
  PositionContext,
  CharPositionContext,
  InputStatusContext,
  InputContext,
  WordsContext,
} from '../../context';

import LanguageSelect from '../../components/LanguageSelect';
import TypingText from '../../components/TypingText';
import Input from '../../components/Input';
import CompletedModal from '../../components/CompletedModal';
import KeyboardAssist from '../../components/KeyboardAssist';

import { STATECODE } from '../../constants';

export default function Home() {
  const { language, setLanguage } = useContext(LanguageContext);
  const { position, setPosition } = useContext(PositionContext);
  const { setCharPosition } = useContext(CharPositionContext);
  const { setInput } = useContext(InputContext);
  const { inputStatus, setInputStatus } = useContext(InputStatusContext);
  const { words, setWordIndex } = useContext(WordsContext);

  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const onReset = () => {
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
          <LanguageSelect
            language={language}
            setLanguage={setLanguage}
            onReset={onReset}
          />
        </Row>
        <Row>
          <TypingText
            position={position}
            inputStatus={inputStatus}
            text={words.join(' ')}
          />
        </Row>
        <Row>
          <Input
            onCompleted={onCompleted}
            textLength={words.join(' ').length}
            position={position}
            setPosition={setPosition}
            inputStatus={inputStatus}
            setInputStatus={setInputStatus}
          />
        </Row>
        <Row>
          <KeyboardAssist />
        </Row>
      </Col>
      <CompletedModal show={showCompletedModal} onHide={onCompletedModalExit} />
    </Container>
  );
}

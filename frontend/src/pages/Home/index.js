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

import { STATECODE } from '../../constants';

const sampleEnglish =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod';

const sampleChinese = '我爱学习';

export default function Home() {
  const { language, setLanguage } = useContext(LanguageContext);
  const { position, setPosition } = useContext(PositionContext);
  const { setCharPosition } = useContext(CharPositionContext);
  const { setInput } = useContext(InputContext);
  const { inputStatus, setInputStatus } = useContext(InputStatusContext);
  const { setWordIndex } = useContext(WordsContext);

  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const onReset = () => {
    setPosition(0);
    setCharPosition(0);
    setWordIndex(0);
    setInput('');
    setInputStatus(STATECODE.READY);
  };

  const onCompleted = () => {
    setInput(''); // Why not working? - Gary
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
          <LanguageSelect language={language} />
        </Row>
        <Row>
          <TypingText
            position={position}
            inputStatus={inputStatus}
            text={sampleEnglish}
          />
        </Row>
        <Row>
          <Input
            onCompleted={onCompleted}
            textLength={sampleEnglish.length}
            position={position}
            setPosition={setPosition}
            inputStatus={inputStatus}
            setInputStatus={setInputStatus}
          />
        </Row>
      </Col>
      <CompletedModal show={showCompletedModal} onHide={onCompletedModalExit} />
    </Container>
  );
}

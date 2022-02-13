import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';

import { ACTIONS } from '../../actions';

import Timer from '../../components/Timer';
import LanguageSelect from '../../components/LanguageSelect';
// import TypingText from '../../components/TypingText';
import Input from '../../components/Input';
import CompletedModal from '../../components/CompletedModal';
// import KeyboardAssist from '../../components/KeyboardAssist';

import ChineseTypingText from '../../components/TypingText/ChineseTypingText';
// import MorseCodeTypingText from '../../components/TypingText/MorseCodeTypingText';

import './Home.css';

export default function Home() {
  const start = useSelector((state) => state.start);

  const dispatch = useDispatch();

  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const onReset = () => {
    dispatch({ type: ACTIONS.RESET });
  };

  const onCompleted = () => {
    // setTimeRunning(false);
    // setTime(0);
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
            <LanguageSelect />
          </Col>
          <Col className="justify-content-end">
            <Timer />
          </Col>
        </Row>
        <Row>
          {/* {language === 'zh' ? ( */}
          <ChineseTypingText />

          {/*
          
            ) : language === 'morse' ? (
              <MorseCodeTypingText text={words} />
            ) : (
              <TypingText
                // position={position}
                // inputStatus={inputStatus}
                text={words.join(' ')}
              />
            )}
          
          */}
        </Row>
        <Row style={{ height: '2.5rem' }}>
          {/* When adding support for other languages, might need to turn back on state */}
          {!start ? (
            <h3 className="w-auto my-auto mx-auto">Press Enter to start</h3>
          ) : (
            <p className="w-auto my-auto mx-auto text-muted">
              Stuck? Type '=' for a hint
            </p>
          )}
          {/* )} */}
        </Row>
        <Row>
          <Input onCompleted={onCompleted} />
        </Row>
        {/* <Row
          className={`d-flex justify-content-center px-5 py-3 ${
            errorCount >= 3 ? 'fade-in' : 'fade-out'
          }`}
          className="mt-5 pb-5"
        >
          {errorCount >= 3 && <KeyboardAssist />}
          <KeyboardAssist />
        </Row> */}
      </Col>
      <CompletedModal
        show={showCompletedModal}
        // time={time}
        onHide={onCompletedModalExit}
      />
    </Container>
  );
}

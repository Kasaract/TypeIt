import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withReact } from 'slate-react';
import { createEditor } from 'slate';
import { Container, Col, Row } from 'react-bootstrap';
import jwt from 'jsonwebtoken';

import { ACTIONS } from '../../actions';

// import Timer from '../../components/Timer';
import LanguageSelect from '../../components/LanguageSelect';
// import TypingText from '../../components/TypingText';
import Input from '../../components/Input';
import CompletedModal from '../../components/CompletedModal';
// import KeyboardAssist from '../../components/KeyboardAssist';

import TypingText from '../../components/TypingText';
import ChineseTypingText from '../../components/TypingText/ChineseTypingText';
// import MorseCodeTypingText from '../../components/TypingText/MorseCodeTypingText';

import { getNewExcerpt } from '../../reducers/getNewExcerpt';

import './Home.css';

export default function Home() {
  // const start = useSelector((state) => state.start);
  // const eventLog = useSelector((state) => state.eventLog);
  const completed = useSelector((state) => state.completed);
  const language = useSelector((state) => state.language);

  const [editor] = useState(() => withReact(createEditor()));

  const dispatch = useDispatch();

  const history = useHistory();

  // const [showCompletedModal, setShowCompletedModal] = useState(false);

  // const [time, setTime] = useState(10);
  // const [isActive, setIsActive] = useState(false);

  // const toggleTime = () => {
  //   setIsActive(!isActive);
  // };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem('token');
        history.replace('/login');
      } else {
        const getNewExcerptThunk = getNewExcerpt(language);
        dispatch(getNewExcerptThunk);
      }
    } else {
      history.replace('/login');
    }
  }, [dispatch, language, history]);

  // const inputToggleTime = () => toggleTime();

  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setTime((time) => time + 1);
  //     }, 1000);
  //   } else if (!isActive && seconds !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       // if (time > 0) {
  //       setTime((time) => time - 1);
  //       // } else {
  //       //   //     dispatch({ type: ACTIONS.END });
  //       //   //     return;
  //       //   clearInterval(interval);
  //       // }
  //       //   }
  //     }, 1000);
  //   } else {
  //     clearInterval(interval);
  //   }

  //   return () => clearInterval(interval);
  // }, [time, isActive]);

  // const onReset = () => {
  //   dispatch({ type: ACTIONS.RESET });
  // };

  const onCompleted = () => {
    // setTimeRunning(false);
    // setTime(0);
    // setShowCompletedModal(true);
    dispatch({ type: ACTIONS.COMPLETE });
  };

  // const onCompletedModalExit = () => {
  //   // onReset();
  //   // setShowCompletedModal(false);

  //   dispatch({ type: ACTIONS.RESET });
  // };

  return (
    <Container className="vh-100">
      <Col className="h-100">
        <Row>
          <Col>
            <LanguageSelect />
          </Col>
          <Col className="justify-content-end">
            {/* <Timer /> */}
            {/* <h1>{time}s</h1> */}
          </Col>
        </Row>
        <Row>
          {language === 'zh' ? <ChineseTypingText /> : <TypingText />}

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
        <Row style={{ height: '2.5rem' }} className="mb-3">
          {/* When adding support for other languages, might need to turn back on state */}
          <p className="w-auto my-auto mx-auto fs-5">Stuck? Press '=' for a hint</p>
          {/* )} */}
        </Row>
        <Row>
          <Input editor={editor} onCompleted={onCompleted} />
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
        {/* <KeyboardAssist /> */}
      </Col>
      {/* {JSON.stringify(eventLog)} */}
      <CompletedModal
        editor={editor}
        show={completed}
        // time={time}
        // onHide={onCompletedModalExit}
      />
    </Container>
  );
}

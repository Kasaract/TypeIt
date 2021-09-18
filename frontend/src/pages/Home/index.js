import { useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import { LanguageContext, PositionContext, InputStatusContext } from '../../context';

import LanguageSelect from '../../components/LanguageSelect';
import TypingText from '../../components/TypingText';
import Input from '../../components/Input';

const sampleEnglish =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const sampleChinese = '我爱学习';

export default function Home() {
  const { language, setLanguage } = useContext(LanguageContext);
  const { position, setPosition } = useContext(PositionContext);
  const { inputStatus, setInputStatus } = useContext(InputStatusContext);

  return (
    <Container className="vh-100">
      <Col className="h-100">
        <Row>
          <LanguageSelect language={language}/>
        </Row>
        <Row>
          <TypingText
            position={position}
            inputStatus={inputStatus}
            text={sampleChinese}
          />
        </Row>
        <Row>
          <Input
            position={position}
            setPosition={setPosition}
            inputStatus={inputStatus}
            setInputStatus={setInputStatus}
          />
        </Row>
      </Col>
    </Container>
  );
}

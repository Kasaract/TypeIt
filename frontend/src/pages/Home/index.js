import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import TypingText from '../../components/TypingText';
import Input from '../../components/Input';

export default function Home() {
  return (
    <Container className="vh-100">
      <Col className="h-100">
        <Row>
          <TypingText />
        </Row>
        <Row>
          <Input />
        </Row>
      </Col>
    </Container>
  );
}

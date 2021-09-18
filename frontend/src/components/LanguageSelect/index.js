import { useState } from 'react';
import { Button, Form, Row, Modal } from 'react-bootstrap';

import { languageCodes } from '../../languages/languageCodes';
import { sampleText } from '../../languages/sampleText';

import './languageSelect.css';

export default function LanguageSelect({ language, setLanguage, onReset }) {
  const [filter, setFilter] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (lang) => {
    setLanguage(lang);
    setShow(false);
    onReset();
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <>
      <Row className="mt-5 mb-3 px-5">
        <Button className="w-auto" onClick={handleShow}>
          {`Language: ${languageCodes[language].name}`}
        </Button>
      </Row>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-80w">
        <Modal.Header closeButton>
          <Modal.Title>Select Language</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Search languages..."
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="mb-1"
          />
          <div
            className="d-flex flex-column flex-wrap"
            style={{ maxHeight: '125vh' }}
          >
            {Object.keys(languageCodes).map((lang) => {
              return (
                new RegExp(filter.toLowerCase(), 'g').test(
                  languageCodes[lang].name.toLowerCase()
                ) &&
                lang.toUpperCase() in sampleText && (
                  <Button
                    variant="light"
                    className="p-2 text-start"
                    onClick={() => handleClick(lang)}
                    style={{
                      fontSize: '1.05rem',
                      backgroundColor: language === lang && 'lightgray',
                    }}
                    key={lang}
                  >
                    {languageCodes[lang].name}
                  </Button>
                )
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

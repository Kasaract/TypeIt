import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { languageCodes } from '../../languages/languageCodes.js';

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
      <div>Current Language: {languageCodes[language].name}</div>
      <Button className="w-auto" onClick={handleShow}>
        Select Language
      </Button>

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
                ) && (
                  <Button
                    variant="light"
                    className="p-2 text-start"
                    onClick={() => handleClick(lang)}
                    style={{
                      fontSize: '1.05rem',
                      backgroundColor: language === lang && 'lightgray',
                    }}
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

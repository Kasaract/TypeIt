import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Row, Modal } from 'react-bootstrap';

import { ACTIONS } from '../../actions';

import { languageCodes } from '../../languages/languageCodes';
import { sampleText } from '../../languages/sampleText';

import './languageSelect.css';

export default function LanguageSelect() {
  const [filter, setFilter] = useState('');
  const [show, setShow] = useState(false);

  const language = useSelector((state) => state.language);
  const pinyinAssistFeature = useSelector((state) => state.pinyinAssistFeature);
  const pinyinAssistDelay = useSelector((state) => state.pinyinAssistDelay);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (lang) => {
    dispatch({ type: ACTIONS.CHANGELANGUAGE, payload: lang });
    setFilter('');
    setShow(false);
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handlePinyinAssistFeature = () => {
    dispatch({ type: ACTIONS.PINYINASSISTFEATURE });
  };

  const handlePinyinAssistDelay = (newDelay) => {
    dispatch({ type: ACTIONS.PINYINASSISTDELAY, payload: newDelay });
  };

  return (
    <>
      <Row className="d-flex justify-content-between mt-5 mb-3 px-5">
        <Button className="w-auto" onClick={handleShow}>
          {`Language: ${languageCodes[language].name}`}
        </Button>

        <div className="w-25">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="pinyinAssist"
              checked={pinyinAssistFeature}
              onChange={handlePinyinAssistFeature}
            />
            <label class="form-check-label" for="pinyinAssist">
              Pinyin Assist
            </label>
          </div>
          <Form.Select
            disabled={!pinyinAssistFeature}
            onChange={(e) => handlePinyinAssistDelay(e.target.value)}
          >
            <option value={pinyinAssistDelay}>{`${pinyinAssistDelay} s`}</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option value={n}>{n} s</option>
            ))}
          </Form.Select>
        </div>
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

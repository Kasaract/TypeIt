import { useState } from 'react';
import { Button, Modal } from "react-bootstrap"

let languageCodes = require('../../languages/languageCodes.js');

export default function LanguageSelect({
    language,
    setLanguage,
}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (lang) => {
        setLanguage(lang);
        setShow(false);
    };

    return (
        <>
            <div>Current Language: { languageCodes.languageCodes[language].name }</div>
            <Button onClick={handleShow}>
                Select Language
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Language</Modal.Title>
                </Modal.Header>

                <Modal.Body className="d-flex flex-wrap">
                    {
                        Object.keys(languageCodes.languageCodes).map(lang => {
                            return (<Button variant="light" className="p-2" onClick={() => handleClick(lang)}>{ languageCodes.languageCodes[lang].name }</Button>);
                        })
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
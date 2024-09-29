import React, { useState } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onRandomWord, onInputWord }) {
    const [inputWord, setInputWord] = useState('');

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        setInputWord(e.target.value);
    };

    const handleInputSubmit = () => {
        onInputWord(inputWord.toUpperCase());
        onClose();
    };

    const handleClose = () => {
        onRandomWord();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={handleClose}>X</button>
                <div className="modal-content">
                    <h2>Choose Word Option</h2>
                    <button onClick={handleClose}
                    className='modal-btn'>Get Random Word</button>
                    <div className="modal-divider">
                        <hr />
                        <p>OR</p>
                        <hr/>
                    </div>
                    <div className='modal-input'>
                        <input
                            type="text"
                            value={inputWord}
                            onChange={handleInputChange}
                            placeholder="Enter your word"
                        />
                        <button onClick={handleInputSubmit}
                        className='modal-btn'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;

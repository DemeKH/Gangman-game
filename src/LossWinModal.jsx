// LossWinModal.jsx
import React from 'react';
import './LossWinModal.css'; // Reuse the same CSS or customize if needed

function LossModal({ isOpen, onClose, word, winOrLose}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <h1 className='endText'>
                        {winOrLose ? (
                            <p>You won, you guessed the word {word}</p>
                        ) : (
                            <p>You lost, the word was {word}</p>
                        )}
                    </h1>
                    <button onClick={onClose} className='play-again-btn'>Play again</button>
                </div>
            </div>
        </div>
    );
}

export default LossModal;

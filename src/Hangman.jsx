import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import LossWinModal from "./LossWinModal.jsx";

const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

const fadedStyle = {
    color: 'rgba(0, 0, 0, 0.4)',
    border: '1.5px solid rgba(0, 0, 0, 0.4)',
    transition: '300ms ease-in-out'
};

function Hangman() {
    const [word, setWord] = useState("");
    const [letters, setLetters] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongCount, setWrongCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isLossModalOpen, setIsLossModalOpen] = useState(false);
    const [correctLetters, setCorrectLetters] = useState(0);
    const [hasPlayerWon, setHasPlayerWon] = useState(false);
    const [fadedButtons, setFadedButtons] = useState(new Set());

    useEffect(() => {
        if (letters.length > 0) {
            if (wrongCount === 7 || correctLetters === letters.length) {
                setIsLossModalOpen(true);
                setHasPlayerWon(correctLetters === letters.length);
            }
        }
    }, [wrongCount, correctLetters]);

    useEffect(()=>{
        if(hasPlayerWon){
            setIsLossModalOpen(true);
        }
    },[hasPlayerWon])

    useEffect(() => {
        if (word) {
            setLetters(word.toUpperCase().split(''));
        }
    }, [word]);

    const fetchRandomWord = () => {
        fetch('https://random-word-api.vercel.app/api?word')
            .then(response => response.json())
            .then(data => {
                const randomWord = data[0].toUpperCase();
                setWord(randomWord);
            })
            .catch(error => {
                console.error('Error fetching random word:', error);
            });
    };

    const handleInputWord = (inputWord) => {
        setWord(inputWord);
    };

    function handleGuess(char, event) {

        const button = event.target;
        button.classList.add('faded');
        setFadedButtons(prev => new Set(prev).add(char));
        
        if (!guessedLetters.includes(char)) {
            setGuessedLetters(prev => [...prev, char]);
            if (letters.includes(char)) {
                const occurrences = letters.filter(letter => letter === char).length;
                setCorrectLetters(prev => prev + occurrences);
            } else {
                setWrongCount(prev => prev + 1);
            }
        }
    }

    const refresh = () => {
        setWord("");
        setLetters([]);
        setGuessedLetters([]);
        setWrongCount(0);
        setCorrectLetters(0);
        setIsModalOpen(true);
        setIsLossModalOpen(false);
        setHasPlayerWon(false);
    }

    return (
        <div className="hangman-container">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRandomWord={fetchRandomWord}
                onInputWord={handleInputWord}
            />
            <LossWinModal
                isOpen={isLossModalOpen}
                word={word}
                winOrLose ={hasPlayerWon}
                onClose={() => {
                    setIsLossModalOpen(false);
                    setIsModalOpen(true);
                    setFadedButtons(new Set());
                    refresh();
                }}
            />
            <div className="hangman">
                <div className="base"></div>
                <div className="pillar"></div>
                <div className="crossbar"></div>
                <div className="hanger"></div>
                <div className="head"
                    style={{ visibility: wrongCount >= 1 ? 'visible' : 'hidden' }}></div>
                <div className="body"
                    style={{ visibility: wrongCount >= 2 ? 'visible' : 'hidden' }}></div>
                <div className="arm left-arm"
                    style={{ visibility: wrongCount >= 3 ? 'visible' : 'hidden' }}></div>
                <div className="arm right-arm"
                    style={{ visibility: wrongCount >= 4 ? 'visible' : 'hidden' }}></div>
                <div className="leg left-leg"
                    style={{ visibility: wrongCount >= 5 ? 'visible' : 'hidden' }}></div>
                <div className="leg right-leg"
                    style={{ visibility: wrongCount >= 6 ? 'visible' : 'hidden' }}></div>
            </div>
            <div className="text">
                <h1>
                    {letters.map((letter, index) => (
                        <span key={index} className="underline">
                            <span className="letter"
                                style={{
                                    visibility: guessedLetters.includes(letter)
                                    || wrongCount === 7 ? 'visible' : 'hidden',
                                    color: wrongCount === 7
                                    && !guessedLetters.includes(letter) ? 'red' : 'inherit'
                                }}>
                                {letter}
                            </span>
                        </span>
                    ))}
                </h1>
            </div>
            <div className="letters">
                {alphabet.map(char => (
                    <button key={char}  onClick={(event) => handleGuess(char, event)}
                    className={fadedButtons.has(char) ? 'faded' : ''}>
                        {char}
                    </button>
                ))}
                
            </div>
        </div>
    );
}

export default Hangman;

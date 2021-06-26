import React from 'react';
import { useState } from 'react';
import './App.css';
import { audio } from './audio';

function App() {
    const [text, setText] = useState("");
    const [currentWord, setCurrentWord] = useState("");

    const check = () => {
        if (currentWord === text) {
            audio.playWin();
        } else {
            audio.playError();
        }
    }

    const next = () => {
        const newWord = audio.getRandomWord();
        setCurrentWord(newWord);
        audio.play(newWord);
    }

    return (
        <div className="App">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={check}
            >Проверить</button>
            {
                currentWord && <button
                    onClick={() => audio.play(currentWord)}
                >Переиграть</button>
            }
            <button
                onClick={next}
            >{currentWord ?"Следующее слово" :"Играть"}</button>
        </div>
    );
}

export default App;

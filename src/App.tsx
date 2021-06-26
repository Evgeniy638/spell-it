import React from 'react';
import { useState } from 'react';
import './App.css';
import { audio } from './audio';
import RingDiagram from './components/RingDiagram/RingDiagram';

function App() {
    const [countTry, setCountTry] = useState(0);
    const [countWarn, setCountWarn] = useState(0);
    const [countError, setCountError] = useState(0);

    const [isFirstTry, setIsFirstTry] = useState(true);

    const [text, setText] = useState("");
    const [currentWord, setCurrentWord] = useState("");

    const countRight: number = countTry - countError - countWarn;
    const percentError: number = Math.round(100 * countError / countTry);
    const percentWarn: number = Math.floor(100 * countWarn / countTry);

    const check = () => {
        if (currentWord.toLocaleLowerCase() === text.toLocaleLowerCase()) {
            audio.playWin(next);
            
            if (!isFirstTry) {
                setCountError(countError => countError - 1);
                setCountWarn(countWarn => countWarn + 1);
            }
        } else {
            setIsFirstTry(false);
            audio.playError();
            setCountError(countError => countError + 1);
        }
    }

    const next = (isDecided=true) => {
        const newWord = audio.getRandomWord();
        setCurrentWord(newWord);
        audio.play(newWord);

        setCountTry(countTry => countTry + 1);
        setIsFirstTry(true);

        if (!isDecided) {
            setCountError(countError => countError + 1);
        }
    };

    return (
        <div className="App">
            <div className="App_element">
                {
                    currentWord &&
                    <>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button
                            onClick={check}
                        >Проверить</button>
                    </>
                }
                {
                    currentWord && <button
                        onClick={() => audio.play(currentWord)}
                    >Переиграть</button>
                }
                <button
                    onClick={() => next(!currentWord)}
                >{currentWord ? "Следующее слово" : "Играть"}</button>
            </div>

            {
                countTry > 0 &&
                <div className="App_element">
                    <RingDiagram
                        elements={[
                            {
                                name: "Нерешено",
                                percent: percentError,
                                color: "red"
                            },
                            {
                                name: "Решено не с первого раза",
                                percent: percentWarn,
                                color: "yellow"
                            }
                        ]}
                        default={{ name: "Правильно", color: "green" }}
                        text={`${100 - percentError - percentWarn}%`}
                        underText={`${countRight}/${countTry} правильно`}
                    />
                </div>
            }
        </div>
    );
}

export default App;

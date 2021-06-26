import React, { KeyboardEvent } from 'react';
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
    const percentRight: number = 100 - percentError - percentWarn;

    const start = () => {
        const newWord = audio.getRandomWord();
        setCurrentWord(newWord);
        audio.play(newWord);
    }

    const next = (isDecided = true) => {
        const newWord = audio.getRandomWord();
        setCurrentWord(newWord);
        audio.play(newWord);

        setCountTry(countTry => countTry + 1);
        setIsFirstTry(true);

        if (!isDecided) {
            setCountError(countError => countError + 1);
        }
    };

    const check = () => {
        if (currentWord.toLocaleLowerCase() === text.toLocaleLowerCase()) {
            audio.playWin(() => {
                next();

                if (!isFirstTry) {
                    setCountWarn(countWarn => countWarn + 1);
                }
            });
        } else {
            setIsFirstTry(false);
            audio.playError();
        }
    }

    const onKeyPress = (e: KeyboardEvent<Element>) => {
        if (e.key === "Enter") {
            check();
        }
    }

    return (
        <div className="App">
            <div className="App_element">
                {
                    currentWord
                        ? <>
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyPress={onKeyPress}
                            />
                            <button
                                onClick={check}
                            >Проверить</button>
                            <button
                                onClick={() => audio.play(currentWord)}
                            >Произнести слово заново</button>

                            <button
                                onClick={() => next(false)}
                            >Пропустить слово</button>
                        </>
                        : <button
                            onClick={start}
                        >Играть</button>

                }
            </div>

            {
                countTry > 0 &&
                <div className="App_element">
                    <RingDiagram
                        elements={[
                            {
                                name: `Пропущено ${countError}/${countTry}`,
                                percent: percentError,
                                color: "red"
                            },
                            {
                                name: `Решено не с первого раза ${countWarn}/${countTry}`,
                                percent: percentWarn,
                                color: "yellow"
                            }
                        ]}
                        default={
                            {
                                name: `Правильно решено ${countRight}/${countTry}`,
                                color: "green",
                                percent: percentRight
                            }
                        }
                        text={`${percentRight}%`}
                        underText={`${countRight}/${countTry} правильно`}
                    />
                </div>
            }
        </div>
    );
}

export default App;

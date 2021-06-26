import { listWords } from './listWords';

interface IGetRandomWord {
    (): string
}

interface IPlay {
    (message: string): void
}

interface IStop {
    (): void
}

interface IAudio {
    readonly getRandomWord: IGetRandomWord,
    readonly play: IPlay,
    readonly stop: IStop,
    readonly playWin: Function,
    readonly playError: Function
}

export const audio: IAudio = {
    getRandomWord() {
        return listWords[Math.floor(Math.random() * listWords.length)];
    },
    play(message: string) {
        this.stop();
        const speechSynthesis: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(speechSynthesis);
    },
    stop() {
        window.speechSynthesis.cancel();
    },
    playWin(): void {
        this.play("Правильно");
    },
    playError(): void {
        this.play("Ошибка");
    }
}

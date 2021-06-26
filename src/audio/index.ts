import { listWords } from './listWords';

interface IGetRandomWord {
    (): string
}

interface IPlay {
    (message: string, callback?:Function): void
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
    play(message: string, callback:any) {
        this.stop();
        const speechSynthesis: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.addEventListener("end", callback);
        window.speechSynthesis.speak(speechSynthesis);
    },
    stop() {
        window.speechSynthesis.cancel();
    },
    playWin(callback=()=>{}): void {
        this.play("Правильно", callback);
    },
    playError(callback=()=>{}): void {
        this.play("Ошибка", callback);
    }
}

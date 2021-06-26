import { listWords } from './listWords';

export const audio = {
    getRandomWord() {
        return listWords[Math.floor(Math.random() * listWords.length)];
    },
    play(message: string, callback?:any) {
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

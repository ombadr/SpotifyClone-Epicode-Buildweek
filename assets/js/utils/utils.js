export function convertSecondsToMinSec(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

export function generateRandomNumber() {
    const firstPart = Math.floor(Math.random() * 1000);
    const secondPart = Math.floor(Math.random() * 1000);
    const thirdPart = Math.floor(Math.random() * 1000);

    return `${firstPart}.${secondPart}.${thirdPart}`;
}


export function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }

    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    const formattedTime = `${min} min, ${sec} sec`;
    return formattedTime;
}



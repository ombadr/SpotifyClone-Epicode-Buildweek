// This script sets basic functionalities for player controls

// Global constants and variables
let barFill = 0;
let barDuration = 60;
let seconds = 0;

// Selezione elementi del DOM
const playButton = document.querySelector('#playButton');
const pauseButton = document.querySelector("#pauseButton");
const heartEmpty = document.getElementById('heartEmpty');
const heartFilled = document.getElementById('heartFilled');
const fullscreenIcon = document.getElementById('fullscreenIcon');
const exitFullscreenIcon = document.getElementById('exitFullscreenIcon');
const progressBar = document.getElementById('progressBar');
const songTimer = document.getElementById('songTimer');
const volumeContainer = document.querySelector('.volumeContainer');



// Carica gli script al caricamento della finestra
window.onload = (event) => {
    event.preventDefault();
    // Alternates between showing play and pause button
    setToggle(playButton, pauseButton);
    // Alternates between showing filled and empty heart for favorites
    setToggle(heartFilled, heartEmpty);
    // Alternates between showing fullscreen and halfscreen request
    setToggle(fullscreenIcon, exitFullscreenIcon);
    // Sets button for fullscreen request
    setFullscreen();
    setPlayStop();
}

function setFullscreen() {
    // Entra schermo intero se premuto
    fullscreenIcon.addEventListener('click', () => {
        document.body.requestFullscreen();
    });
    // Esce schermo intero se premuto
    exitFullscreenIcon.addEventListener('click', () => {
        document.exitFullscreen();
    });

    // Controlla se il tasto escape viene premuto mentre lo schermo è fullscreen NON FUNZIONA PER ORA
    // document.addEventListener('keydown', (event) => {
    //     if (event.key === "Escape") {
    //         if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    //             fullscreenIcon.classList.remove('d-none');
    //             exitFullscreenIcon.classList.add('d-none');
    //         }
    //     }
    // })
}

// Toggla la visibità tra due pulsanti tramite la classe bootstrap "d-none"
function setToggle(toShow, toHide) {
    toShow.addEventListener('click', () => {
        toShow.classList.toggle('d-none');
        toHide.classList.toggle('d-none');
    })
    toHide.addEventListener('click', () => {
        toShow.classList.toggle('d-none');
        toHide.classList.toggle('d-none');
    })
}

function setPlayStop() {
    playButton.addEventListener('click', () => {
        const startPlay = setInterval(() => {
            progressBar.setAttribute('Value', barFill);
            if (barFill < 100) { barFill += (1*100)/barDuration / 100; }
            else {
                clearInterval(startPlay);
                barFill = 0;
                progressBar.setAttribute('Value', barFill);
                playButton.classList.remove('d-none');
                pauseButton.classList.add('d-none');
            }
        }, 10)
        
        // Aggiorna is secondi a sinistra della barra
        const pointInTime = setInterval(() => {
            if (seconds < 60){
                seconds++;
                seconds < 10 ? songTimer.innerHTML = `0:0${seconds}` : songTimer.innerHTML = `0:${seconds}`;
            } else {
                seconds = 0;
                songTimer.innerHTML = "0:00"
                clearInterval(pointInTime);
            }
        }, 1000);
        pauseButton.addEventListener('click', () => {
            clearInterval(startPlay);
            clearInterval(pointInTime);
            progressBar.setAttribute('Value', barFill);
        });
    })
}


volumeContainer.addEventListener('mouseenter',(event) => {
    event.preventDefault();
    volumeContainer.classList.add('coloredVolumeBar');
})
    volumeContainer.addEventListener('mouseleave', (event) => {
    event.preventDefault();
    volumeContainer.classList.remove('coloredVolumeBar');
})

const song = new Audio('https://cdns-preview-1.dzcdn.net/stream/c-14041499f5b7a75d738db0484a207d2e-5.mp3')
// song.play()

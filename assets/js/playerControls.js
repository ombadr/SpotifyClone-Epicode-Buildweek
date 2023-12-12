// This script sets basic functionalities for player controls

// Dom elements selection
const playButton = document.querySelector('#playButton');
const pauseButton = document.querySelector("#pauseButton");
const heartEmpty = document.getElementById('heartEmpty');
const heartFilled = document.getElementById('heartFilled');
const fullscreenIcon = document.getElementById('fullscreenIcon');
const exitFullscreenIcon = document.getElementById('exitFullscreenIcon');


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

// document.addEventListener('keydown', (event) => {
//     console.log(event.key)
// })

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
}

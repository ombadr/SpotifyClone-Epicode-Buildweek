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
const fullBar = document.querySelector('.fullBar');



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


volumeContainer.addEventListener('click', function (event) {
    // Get the click location within the component
    const clickX = event.clientX - volumeContainer.getBoundingClientRect().left;
    const containerSize = volumeContainer.clientWidth;
    // const clickY = event.clientY - volumeContainer.getBoundingClientRect().top;
    const newX = volumeContainer.clientWidth - clickX;
    
    // Moves the bar
    fullBar.style.right = newX + 'px';

    // Calculate percentage
    const percentageFromRight = (newX * 100) / containerSize;
    const volumePercentage = 100 - percentageFromRight;
    volumeContainer.style['--progress-bar-transform'] = volumePercentage;
    

    // Inject percentage


    // Log the click coordinates
//     console.log(`Clicked at X: ${clickX}`);
//     console.log(`${newX} px moved to the right`);
//     console.log(`${percentageFromRight}% moved to the right`);
//     console.log(volumePercentage);
});


let isDragging = false;
let initialX;
let initialY;
let offsetX = 0;
let offsetY = 0;

// Event listeners for mouse/touch events
fullBar.addEventListener('mousedown', startDrag);
// fullBar.addEventListener('touchstart', startDrag);

// Functions for handling the drag-and-drop behavior
function startDrag(e) {
    e.preventDefault();

    if (e.type === 'mousedown') {
        initialX = e.clientX;
        initialY = e.clientY;
    }

    offsetX = fullBar.offsetLeft - initialX;
    // offsetY = fullBar.offsetTop - initialY;

    isDragging = true;

    // Attach event listeners to handle dragging and dropping
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

function drag(e) {
    if (!isDragging) return;

    e.preventDefault();

    if (e.type === 'mousemove') {
        const currentX = e.clientX;
        fullBar.style.left = currentX + offsetX + 'px';
    } else if (e.type === 'touchmove') {
        const currentX = e.touches[0].clientX;
        fullBar.style.left = currentX + offsetX + 'px';
    }
}

function stopDrag() {
    isDragging = false;

    // Remove the event listeners when dragging is finished
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

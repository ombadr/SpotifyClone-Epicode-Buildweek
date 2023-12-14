// This script sets basic functionalities for player controls
// Global constants and variables
let barFill = 0;
let barDuration = 60;
let seconds = 0;
let volume = 1;
let duration = 0;

// Selezione elementi del DOM
const playButton = document.querySelector("#playButton");
const pauseButton = document.querySelector("#pauseButton");
const heartEmpty = document.getElementById("heartEmpty");
const heartFilled = document.getElementById("heartFilled");
const fullscreenIcon = document.getElementById("fullscreenIcon");
const exitFullscreenIcon = document.getElementById("exitFullscreenIcon");
const progressBar = document.getElementById("progressBar");
const songTimer = document.getElementById("songTimer");
const volumeContainer = document.querySelector(".volumeContainer");
const fullBar = document.querySelector(".fullBar");

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
};

function setFullscreen() {
    // Entra schermo intero se premuto
    fullscreenIcon.addEventListener("click", () => {
        document.body.requestFullscreen();
    });
    // Esce schermo intero se premuto
    exitFullscreenIcon.addEventListener("click", () => {
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
    toShow.addEventListener("click", () => {
        toShow.classList.toggle("d-none");
        toHide.classList.toggle("d-none");
    });
    toHide.addEventListener("click", () => {
        toShow.classList.toggle("d-none");
        toHide.classList.toggle("d-none");
    });
}

function setPlayStop() {
    playButton.addEventListener("click", () => {
        const startPlay = setInterval(() => {
            progressBar.setAttribute("Value", barFill);
            if (barFill < 100) {
                barFill += (1 * 100) / barDuration / 100;
            } else {
                clearInterval(startPlay);
                barFill = 0;
                progressBar.setAttribute("Value", barFill);
                playButton.classList.remove("d-none");
                pauseButton.classList.add("d-none");
            }
        }, 10);

        // Aggiorna is secondi a sinistra della barra
        const pointInTime = setInterval(() => {
            if (seconds < 60) {
                seconds++;
                seconds < 10
                    ? (songTimer.innerHTML = `0:0${seconds}`)
                    : (songTimer.innerHTML = `0:${seconds}`);
            } else {
                seconds = 0;
                songTimer.innerHTML = "0:00";
                clearInterval(pointInTime);
            }
        }, 1000);
        pauseButton.addEventListener("click", () => {
            clearInterval(startPlay);
            clearInterval(pointInTime);
            progressBar.setAttribute("Value", barFill);
        });
    });
}

volumeContainer.addEventListener("mouseenter", (event) => {
    event.preventDefault();
    volumeContainer.classList.add("coloredVolumeBar");
});
volumeContainer.addEventListener("mouseleave", (event) => {
    event.preventDefault();
    volumeContainer.classList.remove("coloredVolumeBar");
});

volumeContainer.addEventListener("click", function (event) {
    // Get the click location within the component
    const clickX = event.clientX - volumeContainer.getBoundingClientRect().left;
    const containerSize = volumeContainer.clientWidth;
    // const clickY = event.clientY - volumeContainer.getBoundingClientRect().top;
    const newX = volumeContainer.clientWidth - clickX;

    // Moves the bar
    fullBar.style.right = newX + "px";

    // Calculate percentage
    const percentageFromRight = (newX * 100) / containerSize;
    const volumePercentage = 100 - percentageFromRight;
    volumeContainer.style["--progress-bar-transform"] = volumePercentage;
    volume = volumePercentage / 100;
});

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=rhapsody";
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "83ad2cb7a2msh577873a178d1b4cp1bd24bjsn31bf740783c2",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
};

async function fetchData(url, options) {
    try {
        // Make a GET request using the fetch function
        const response = await fetch(url, options); // Replace with your API URL

        // Check if the response status is OK (status code 200)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Parse the response as JSON
        const data = await response.json();
        const song = data.data[0];
        playSong(song);
    } catch (error) {
        // Handle errors here
        console.error("Error:", error);
    }
}

fetchData(url, options);

// Plays and stops song when triggered
function playSong(songData) {
    let song = new Audio(songData.preview);
    let songVolume = setInterval(() => {
        song.volume = volume;
    }, 100);
    let songCurrentTime = setInterval(() => {
        // console.log(song.currentTime);
    }, 1000);
    let songDuration = setInterval(() => {
        duration = song.duration;
        clearInterval(songDuration);
    }, 100);
    console.log(songDuration);

    playButton.addEventListener("click", () => {
        song.play();
        const checkSongStatus = setInterval(() => {
            if (song.ended) {
                clearInterval(checkSongStatus);
            }
            console.log(song.ended);
        }, 100);
    });
    pauseButton.addEventListener("click", () => {
        song.pause();
    });
}
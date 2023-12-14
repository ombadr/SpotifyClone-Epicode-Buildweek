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
const backWardButton = document.getElementById('backwardButton');
const shuffleButton = document.getElementById('shuffleBtn');
const repeatButton = document.getElementById('repeatBtn');
const heartEmpty = document.getElementById("heartEmpty");
const heartFilled = document.getElementById("heartFilled");
const fullscreenIcon = document.getElementById("fullscreenIcon");
const exitFullscreenIcon = document.getElementById("exitFullscreenIcon");
const progressBar = document.getElementById("progressBar");
const songTimer = document.getElementById("songTimer");
const songDurationDisplay = document.getElementById('songDuration');
const volumeContainer = document.querySelector(".volumeContainer");
const fullBar = document.querySelector(".fullBar");
const nowPlaying = document.querySelector('.nowPlaying');
const playKey = 'Enter';
const bandRequested = 'blindguardian'
const songNumber = 6;

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + bandRequested;

// Carica gli script al caricamento della finestra
window.onload = (event) => {
  event.preventDefault();
  fetchData(url, options);
  // Alternates between showing play and pause button
  setToggle(playButton, pauseButton);
  // Alternates between showing filled and empty heart for favorites
  setToggle(heartFilled, heartEmpty);
  // Alternates between showing fullscreen and halfscreen request
  setToggle(fullscreenIcon, exitFullscreenIcon);
  // Sets button for fullscreen request
  setFullscreen();
  setVolumeBar();
  setShuffleAndRepeat();
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
    const song = data.data[songNumber];

    // Sets info panel in song
    setSongInfo(song);

    // Sets player to play song
    setPlaySong(song);

  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
}


// Plays and stops song when triggered
function setPlaySong(songData) {
  let song = new Audio(songData.preview);
  setInterval(() => {
    // Check every 100ms what the volume is and updates it in real time
    song.volume = localStorage.getItem('Volume');
  }, 250);

  // Updates song current time
  let songCurrentTime = setInterval(() => {
    displayCurrentTime(song);
  }, 100);

  // Displays overal song duration
  let songDuration = setInterval(() => {
    displaySongDuration(song)
    duration = song.duration;
    clearInterval(songDuration);
  }, 100);
  let checkSongLoop = setInterval(() =>
    repeatButton.classList.contains('playerControlsHighlighted') ? (song.loop = true) : (song.loop = false)
    , 500);
  setInterval(() => {
    if (song.ended) {
      pauseButton.classList.add('d-none');
      playButton.classList.remove('d-none');
      barFill = 0;
      seconds = 0;
      // clearInterval(songCurrentTime);
      clearInterval(songDuration);
      songCurrentTime.innerHTML = "0:00";
    }
  }, 500)

  // Uses a key to trigger play and pause
  TOFIX:
  // if (document.activeElement === document.body){
  //   document.addEventListener('keydown', (event) => {
  //     if (event.key === playKey){
  //       song.paused === true? song.play() : song.pause();
  //       pauseButton.classList.toggle('d-none');     
  //       playButton.classList.toggle('d-none');     
  //     }
  //   })
  // }

  // Sets function of backward button
  setSkipBackward(song);

  // Sets button to play song
  playButton.addEventListener("click", () => {
    song.play();
  });


  // Sets button to pauses song
  pauseButton.addEventListener("click", () => {
    song.pause();
  });
}

function setPlayParameters() {
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
  pauseButton.addEventListener("click", () => {
    clearInterval(startPlay);
    clearInterval(pointInTime);
    progressBar.setAttribute("Value", barFill);
  });
};

function displaySongDuration(song) {
  let durationToDisplay = Math.ceil(song.duration);
  songDurationDisplay.innerHTML = `0:${durationToDisplay}`;
}

function displayCurrentTime(song) {
  seconds = Math.ceil(song.currentTime);
  barFill = barFillerValue(song.currentTime, song.duration);
  progressBar.setAttribute('Value', barFill);
  if (seconds < 10) {
    songTimer.innerHTML = `0:0${seconds}`
  } else {
    songTimer.innerHTML = `0:${seconds}`
  }
  if (song.ended) {
    songTimer.innerHTML = "0:00";
    barFill = 0;
    progressBar.setAttribute('Value', 0);
  }
}

// Returns the value of the song in percentage
function barFillerValue(currentTime, duration) {
  return currentTime * 100 / duration;
}

// Setta a 0 il valore della canzone quando il tasto viene premuto
function setSkipBackward(song) {
  backWardButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (song.currentTime > 2)
      song.currentTime = 0;
  })
}

// Sets fullscreen
function setFullscreen() {
  // Entra schermo intero se premuto
  fullscreenIcon.addEventListener("click", () => {
    document.body.requestFullscreen();
  });
  // Esce schermo intero se premuto
  exitFullscreenIcon.addEventListener("click", () => {
    document.exitFullscreen();
  });
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

// Sets volume bar functionalities
function setVolumeBar() {
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
    localStorage.setItem('Volume', volume);
  });
}

// Sets shuffle and repeat controls
function setShuffleAndRepeat() {
  shuffleButton.addEventListener('click', (event) => {
    event.preventDefault();
    shuffleButton.classList.toggle('playerControlsHighlighted')
  })
  repeatButton.addEventListener('click', (event) => {
    event.preventDefault();
    repeatButton.classList.toggle('playerControlsHighlighted')
  })
}

// Set picture, title and artist info. To recall when needed
function setSongInfo(song) {
  let artistName = song.artist.name;
  let title = song.title;
  let imageUrl = song.artist.picture_small;
  nowPlaying.querySelector('img').src = imageUrl;
  nowPlaying.querySelector('div h6').innerHTML = artistName;
  nowPlaying.querySelector('div p').innerHTML = title;
}


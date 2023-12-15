let optionsPlayer = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '349d0315bamshe22fa1098ac0240p133261jsnab757b4a040e',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
}

let barFill = 0;
let barDuration = 60;
let seconds = 0;
let volume = 1;
let duration = 0;

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
const bandRequested = 'bomfunk mc'
const songNumber = 6;

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + bandRequested;


window.onload = (event) => {
  event.preventDefault();
  fetchData(url, optionsPlayer);
  setToggle(playButton, pauseButton);
  setToggle(heartFilled, heartEmpty);
  setToggle(fullscreenIcon, exitFullscreenIcon);
  setFullscreen();
  setVolumeBar();
  setShuffleAndRepeat();
};


async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const song = data.data[songNumber];

    setSongInfo(song);
    setPlaySong(song);

  } catch (error) {
    console.error("Error:", error);
  }
}

function setPlaySong(songData) {
  let song = new Audio(songData.preview);
  setInterval(() => {
    song.volume = localStorage.getItem('Volume');
  }, 250);

  let songCurrentTime = setInterval(() => {
    displayCurrentTime(song);
  }, 100);

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

  setSkipBackward(song);

  playButton.addEventListener("click", () => {
    song.play();
  });

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

function barFillerValue(currentTime, duration) {
  return currentTime * 100 / duration;
}

function setSkipBackward(song) {
  backWardButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (song.currentTime > 2)
      song.currentTime = 0;
  })
}

function setFullscreen() {
  fullscreenIcon.addEventListener("click", () => {
    document.body.requestFullscreen();
  });
  exitFullscreenIcon.addEventListener("click", () => {
    document.exitFullscreen();
  });
}

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
    const clickX = event.clientX - volumeContainer.getBoundingClientRect().left;
    const containerSize = volumeContainer.clientWidth;
    const newX = volumeContainer.clientWidth - clickX;

    fullBar.style.right = newX + "px";

    const percentageFromRight = (newX * 100) / containerSize;
    const volumePercentage = 100 - percentageFromRight;
    volumeContainer.style["--progress-bar-transform"] = volumePercentage;
    volume = volumePercentage / 100;
    localStorage.setItem('Volume', volume);
  });
}

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

function setSongInfo(song) {
  let artistName = song.artist.name;
  let title = song.title;
  let imageUrl = song.artist.picture_small;
  nowPlaying.querySelector('img').src = imageUrl;
  nowPlaying.querySelector('div h6').innerHTML = artistName;
  nowPlaying.querySelector('div p').innerHTML = title;
}


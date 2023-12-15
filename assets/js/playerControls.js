// This script sets basic functionalities for player controls
// Global constants and variables
let barFill = 0;
let barDuration = 60;
let seconds = 0;
let volume = 1;
let duration = 0;

const bandsArray = ["ABBA", "AC/DC", "Aerosmith", "The Allman Brothers Band", "Amadou and Mariam", "The Andrews Sisters", "The Animals", "Arcade Fire", "The Band", "The Beach Boys", "The Beastie Boys", "The Beatles", "The Bee Gees", "Big Star", "Black Flag", "Black Sabbath", "Blondie", "Booker T. and the MGs", "Boston", "The Boswell Sisters", "Boyz II Men", "Brooks & Dunn", "Buffalo Springfield", "The Byrds", "Calle 13", "The Chemical Brothers", "Chicago", "The Clash", "The Coasters", "Coldplay", "Alice Cooper", "Cream", "Creedence Clearwater Revival", "Crosby, Stills & Nash", "Daft Punk", "De La Soul", "Death Cab for Cutie", "The Decemberists", "Def Leppard", "Devo", "The Dillards", "Dion and the Belmonts", "Dire Straits", "Dixie Chicks", "The Doors", "The Drifters", "The Eagles", "Earth, Wind & Fire", " Emerson Lake & Palmer", "The Everly Brothers", "The Flamingos", "Fleetwood Mac", "The Flying Burrito Brothers", "The Four Seasons", "The Four Tops", "Fugazi", "The Gang of Four", "Genesis", "Grandmaster Flash and the Furious Five", "The Grateful Dead", "Green Day", "Guns N Roses", "Hüsker Dü", "The Hollies", "Iggy and the Stooges", "The Ink Spots", "The Isley Brothers", "The Jam", "The Jefferson Airplane", "The Jesus and Mary Chain", "Jonas Brothers", "Joy Division", "The Judds", "The Kingston Trio", "The Kinks", "Gladys Knight and the Pips", "Kool and the Gang", "Kraftwerk", "Ladysmith Black Mambazo", "Led Zeppelin", "Little Anthony and the Imperials", "The Louvin Brothers", "Love", "The Lovin Spoonful", "Frankie Lymon and the Teenagers", "Lynyrd Skynyrd", "The MC5", "The Mamas and the Papas", "The Mekons", "Metallica", "The Mills Brothers", "Modest Mouse", "The Monkees", "The Moody Blues", "The Moonglows", "Mumford & Sons", "My Chemical Romance", "New Order", "The New York Dolls", "Nine Inch Nails", "Nirvana", "The OJays", "The Ohio Players", "One Direction", "The Orioles", "OutKast", "Parliament-Funkadelic", "Pavement", "Pearl Jam", "Pere Ubu", "The Pet Shop Boys", "Peter, Paul and Mary", "Pink Floyd", "Pixies", "The Platters", "Poco", "The Police", "Portishead", "Public Enemy", "Puffy AmiYumi", "Queen", "R.E.M.", "Radiohead", "Rage Against the Machine", "The Ramones", "Rascal Flatts", "Red Hot Chili Peppers", "The Replacements", "The Rolling Stones", "Roxy Music", "Run-D.M.C.", "Sam and Dave", "Santana", "The Sex Pistols", "The Shadows", "The Shirelles", "Sleater-Kinney", "Sly and the Family Stone", "Smashing Pumpkins", "The Smiths", "Sonic Youth", "The Soul Stirrers", "Spice Girls", "Stanley Brothers", "The Staple Singers", "Steely Dan", "The Strokes", "TV on the Radio", "Talking Heads", "Television", "The Temptations", "Tinariwen", "Toots and the Maytals", "Traffic", "The Turtles", "U2", "Van Halen", "The Velvet Underground", "The Ventures", "The Weavers", "The White Stripes", "The Who", "Wilco", "X", "The Yardbirds", "Yes", "Yo La Tengo", "ZZ Top"];

// Selezione elementi del DOM
const playButton = document.querySelector("#playButton");
const pauseButton = document.querySelector("#pauseButton");
const backWardButton = document.getElementById('backwardButton');
const forwardButton = document.getElementById('forwardButton')
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
let bandRequested = randomBand(bandsArray);
let songNumber = randomSong();

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



const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + bandRequested;
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
    const song = data.data;

    // Sets player to play song
    setPlaySong(song);

  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
}

// Set picture, title and artist info. To recall when needed
function setSongInfo(song) {
  let artistName = song[songNumber].artist.name;
  let title = song[songNumber].title;
  let imageUrl = song[songNumber].artist.picture_small;
  nowPlaying.querySelector('img').src = imageUrl;
  nowPlaying.querySelector('div h6').innerHTML = artistName;
  nowPlaying.querySelector('div p').innerHTML = title;
}

// Plays and stops song when triggered
function setPlaySong(songData) {
  setSongInfo(songData);
  let songObject = new Audio(songData[songNumber].preview);
  let storeVolume = setInterval(() => {
    // Check every 100ms what the volume is and updates it in real time
    songObject.volume = localStorage.getItem('Volume');
  }, 250);
  // Updates songObject current time
  let songCurrentTime = setInterval(() => {
    displayCurrentTime(songObject);
  }, 100);
  // Displays overal songObject duration
  let songDuration = setTimeout(() => {
    displaySongDuration(songObject)
    duration = songObject.duration;
    clearTimeout(songDuration);
  }, 500);
  let checkSongLoop = setInterval(() =>
    repeatButton.classList.contains('playerControlsHighlighted') ? (songObject.loop = true) : (songObject.loop = false)
    , 500);
  let endSong = setInterval(() => {
    if (songObject.ended && !songObject.loop) {
      clearInterval(songDuration);
      songCurrentTime.innerHTML = "0:00";
      songNumber++;
      setSongInfo(songData)
      songObject.pause();
      songObject = new Audio(songData[songNumber].preview);

      storeVolume = setInterval(() => {
        // Check every 100ms what the volume is and updates it in real time
        songObject.volume = localStorage.getItem('Volume');
      }, 250);
      // Updates songObject current time
      songCurrentTime = setInterval(() => {
        displayCurrentTime(songObject);
      }, 100);
      // Displays overal songObject duration
      songDuration = setTimeout(() => {
        displaySongDuration(songObject)
        duration = songObject.duration;
        clearTimeout(songDuration);
      }, 500);
      checkSongLoop = setInterval(() =>
        repeatButton.classList.contains('playerControlsHighlighted') ? (songObject.loop = true) : (songObject.loop = false)
        , 500);
      endSong = setInterval(() => {
        if (songObject.ended) {
          pauseButton.classList.add('d-none');
          playButton.classList.remove('d-none');
          barFill = 0;
          seconds = 0;
          // clearInterval(songCurrentTime);
          clearInterval(songDuration);
          songCurrentTime.innerHTML = "0:00";
        }
      }, 500)
      setTimeout(() => songObject.play(), 100);
    }
  }, 500)


  // Sets function of backward button
  backWardButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (songObject.currentTime > 2 || songNumber === 0)
      songObject.currentTime = 0;
    else {
      songNumber--;
      setSongInfo(songData)
      songObject.pause();
      songObject = new Audio(songData[songNumber].preview);
      storeVolume = setInterval(() => {
        // Check every 100ms what the volume is and updates it in real time
        songObject.volume = localStorage.getItem('Volume');
      }, 250);
      // Updates songObject current time
      songCurrentTime = setInterval(() => {
        displayCurrentTime(songObject);
      }, 100);
      // Displays overal songObject duration
      songDuration = setTimeout(() => {
        displaySongDuration(songObject)
        duration = songObject.duration;
        clearTimeout(songDuration);
      }, 500);
      checkSongLoop = setInterval(() =>
        repeatButton.classList.contains('playerControlsHighlighted') ? (songObject.loop = true) : (songObject.loop = false)
        , 500);
      endSong = setInterval(() => {
        if (songObject.ended) {
          pauseButton.classList.add('d-none');
          playButton.classList.remove('d-none');
          barFill = 0;
          seconds = 0;
          // clearInterval(songCurrentTime);
          clearInterval(songDuration);
          songCurrentTime.innerHTML = "0:00";
        }
      }, 500)
      setTimeout(() => songObject.play(), 100);
    }
  })

  // Sets button to play songObject
  playButton.addEventListener("click", () => {
    songObject.play();
  });

  // Sets button to pauses song
  pauseButton.addEventListener("click", () => {
    songObject.pause();
  });

  forwardButton.addEventListener('click', (event) => {
    event.preventDefault();
    // Toggle pause play button
    if (pauseButton.classList.contains('d-none')) {
      pauseButton.classList.remove('d-none');
      playButton.classList.add('d-none');
    }
    if (songNumber < songData.length) {
      songNumber++;
      setSongInfo(songData)
      songObject.pause();
      songObject = new Audio(songData[songNumber].preview);

      storeVolume = setInterval(() => {
        // Check every 100ms what the volume is and updates it in real time
        songObject.volume = localStorage.getItem('Volume');
      }, 250);
      // Updates songObject current time
      songCurrentTime = setInterval(() => {
        displayCurrentTime(songObject);
      }, 100);
      // Displays overal songObject duration
      songDuration = setTimeout(() => {
        displaySongDuration(songObject)
        duration = songObject.duration;
        clearTimeout(songDuration);
      }, 500);
      checkSongLoop = setInterval(() =>
        repeatButton.classList.contains('playerControlsHighlighted') ? (songObject.loop = true) : (songObject.loop = false)
        , 500);
      endSong = setInterval(() => {
        if (songObject.ended) {
          pauseButton.classList.add('d-none');
          playButton.classList.remove('d-none');
          barFill = 0;
          seconds = 0;
          // clearInterval(songCurrentTime);
          clearInterval(songDuration);
          songCurrentTime.innerHTML = "0:00";
        }
      }, 500)
      setTimeout(() => songObject.play(), 100);
    } else {
      bandRequested = randomBand();
      songNumber = randomSong();
      setSongInfo(songData)
      songObject.pause();
      songObject = new Audio(songData[songNumber].preview);
      storeVolume = setInterval(() => {
        // Check every 100ms what the volume is and updates it in real time
        songObject.volume = localStorage.getItem('Volume');
      }, 250);
      // Updates songObject current time
      songCurrentTime = setInterval(() => {
        displayCurrentTime(songObject);
      }, 100);
      // Displays overal songObject duration
      songDuration = setTimeout(() => {
        displaySongDuration(songObject)
        duration = songObject.duration;
        clearTimeout(songDuration);
      }, 500);
      checkSongLoop = setInterval(() =>
        repeatButton.classList.contains('playerControlsHighlighted') ? (songObject.loop = true) : (songObject.loop = false)
        , 500);
      endSong = setInterval(() => {
        if (songObject.ended) {
          pauseButton.classList.add('d-none');
          playButton.classList.remove('d-none');
          barFill = 0;
          seconds = 0;
          // clearInterval(songCurrentTime);
          clearInterval(songDuration);
          songCurrentTime.innerHTML = "0:00";
        }
      }, 500)
      setTimeout(() => songObject.play(), 100);
    }
  })
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
  songDurationDisplay.innerHTML = `0:31`;
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
    if (song.currentTime > 2 || songNumber === 0)
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

// Picks a random band from an array of bands
function randomBand(bandsArray) {
  return bandsArray[Math.floor(Math.random() * bandsArray.length)]
}

// Gives the song a random index between 0 and the available number of songs (25)
function randomSong() {
  return Math.floor(Math.random() * 25)
}
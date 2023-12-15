import { convertSecondsToMinSec, generateRandomNumber } from "./utils/utils.js"

const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com/'
let options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '349d0315bamshe22fa1098ac0240p133261jsnab757b4a040e',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
}

const popularTracks = document.getElementById('popularTracks')
// const heroDesktopTitle = document.getElementById('heroDesktopTitle') // remove this
const heroDesktopSection = document.getElementById('heroDesktopSection')
const heroArtist = document.getElementById('hero-artist')
const likedSectionContainerDesktop = document.getElementById('likedSectionContainerDesktop')
const tracksPopularMobile = document.getElementById('tracksPopularMobile')
const heroMobile = document.getElementById('hero-mobile')
const heroMobileArtist = document.getElementById('heroMobileArtist')
const listenersMobileNumber = document.getElementById('listenersMobileNumber')
const likedMobile = document.getElementById('liked-mobile')


document.addEventListener('DOMContentLoaded', () => {

  fetchSongs()




  // MARCO'S MOBILE SCRIPT

  let shuffleIcon = document.getElementById("shuffleIcon");
  let shuffleDot = document.getElementById("shuffleDot");
  let playIcon = document.getElementById("playIcon");
  let followBtn = document.getElementById("followBtn");
  let shuffleActive = false;
  let playActive = false;

  shuffleIcon.addEventListener("click", function () {
    shuffleActive = !shuffleActive;

    shuffleDot.style.display = shuffleActive ? "block" : "none";
    shuffleIcon.classList.toggle("green", shuffleActive);
  });

  followBtn.addEventListener("click", function () {
    followBtn.classList.toggle("followed");
  });

  playIcon.addEventListener("click", function () {
    playActive = !playActive;

    if (playActive) {
      playIcon.classList.remove("bi-play-circle-fill");
      playIcon.classList.add("bi-pause-circle-fill");
    } else {
      playIcon.classList.remove("bi-pause-circle-fill");
      playIcon.classList.add("bi-play-circle-fill");
    }
  });

  // END MARCO'S MOBILE SCRIPT

})

async function fetchSongs() {
  try {


    const urlString = window.location.href;
    const url = new URL(urlString);
    let artistFromUrl = url.searchParams.get('artist')


    const searchResults = await getTracksFromSearch(artistFromUrl)
    const artist = searchResults.data[0].artist.name
    const trackListUrl = searchResults.data[0].artist.tracklist
    const imageUrl = searchResults.data[0].album.cover_big
    console.log(artist)
    console.log(trackListUrl)
    console.log('Image URL: ' + imageUrl)

    if (trackListUrl) {
      let tracksHTML = ''
      let tracksMobileHTML = ''
      const trackList = await getTrackList(trackListUrl)
      console.log('List of tracks:', trackList)

      const heroDesktopHTML = createHeroDesktop(artist)
      displayHeroDesktop(heroDesktopHTML)
      applyBackgroundImage(imageUrl)

      const likedSectionContainerHTML = createLikedSectionContainer(artist, imageUrl)
      displayLikedSectionContainer(likedSectionContainerHTML)

      // hero mobile
      const heroMobileHTML = createHeroMobileAndListeners(artist)
      displayHeroMobileAndListeners(heroMobileHTML)

      // listeners mobile
      const listenersMobileHTML = createListenersMobileNumber()
      displayListenersMobileNumber(listenersMobileHTML)


      // liked mobile
      const likedMobileHTML = createLikedMobile(imageUrl, artist)
      displayLikedMobile(likedMobileHTML)

      for (let i = 0; i < 10; i++) { // max 10 tracks
        console.log(trackList.data[i].title)
        let trackHTML = createPopularSongs(trackList.data[i], i + 1)
        let trackMobileHTML = createPopularTracksMobile(trackList.data[i].title, trackList.data[i].album.cover_big, i + 1)
        tracksHTML += trackHTML
        tracksMobileHTML += trackMobileHTML
      }
      displayPopularSongs(tracksHTML)
      displayPopularTracksMobile(tracksMobileHTML)
    }

  } catch (e) {
    console.error(e)
  }

}

async function getTracksFromSearch(artist) {
  try {
    const data = await fetch(BASE_URL + `search?q=${artist}`, options)
    const response = await data.json()
    return response
  } catch (e) {
    console.error(e);
  }
}

async function getTrackList(trackListUrl) {
  try {
    const response = await fetch(trackListUrl)
    const data = await response.json()
    return data
  } catch (e) {
    console.error(e);
  }
}


// POPULAR SONGS



function createPopularSongs(albumTracks, counter) {
  const { title, duration, album } = albumTracks

  const randomNumber = generateRandomNumber()
  const convertedDuration = convertSecondsToMinSec(duration)

  return `<div class="track d-flex align-items-center p-2">
                    <div class="col-lg-1 trackNumber p-0">${counter}</div>
                    <div
                      class="col-lg-2 trackArt"
                      style="width: 40px; height: 40px"
                    >
                      <img
                        src="${album.cover_big}"
                        alt="albumArt"
                        class="img-fluid"
                      />
                    </div>
                    <div class="col-lg-4 trackTitle p-1">${title}</div>
                    <div class="col-lg-4 trackPlays">${randomNumber}</div>
                    <div class="col-lg-1 trackTime">${convertedDuration}</div>
                  </div>`
}

function displayPopularSongs(albumsHTML) {
  popularTracks.innerHTML = albumsHTML
}

// END POPULAR SONGS

// HERO ARTIST DESKTOP



function createHeroDesktop(artist) {

  const listeners = generateRandomNumber()



  const heroDesktopHTML = `<div id="hero-artist" class="mb-0 mt-3">
              <!--ADD HERE DYNAMICALLY -->

              <div class="container" id="heroDesktopSection">
                <div class="row">
                  <div class="col-md-6">
                    <button
                      onclick="window.history.back()"
                      id="goBackButton"
                      class="rounded-pill border-0 text-secondary bg-black bg-gradient mb-3 mt-2 px-2 py-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-chevron-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p class="d-inline-block text-primary mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-patch-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"
                    />
                  </svg>
                </p>
                <p class="d-inline-block">Artista verificato</p>

                <!--RENDER THIS DYNAMICALLY-->

                <div id="heroDesktopTitle">
                  <h1 class="display-1 mx-3"><b>${artist}</b></h1>
                  <p class="mx-3 p-1">${listeners} ascoltatori mensili</p>
                </div>
              </div>
            </div>`



  return heroDesktopHTML
}


function applyBackgroundImage(imageUrl) {
  try {
    console.log('Applying background image:', imageUrl);
    heroArtist.style.backgroundImage = `url('${imageUrl}')`;
    heroArtist.style.backgroundSize = 'cover';

    heroMobile.style.backgroundImage = `url('${imageUrl}')`;
    heroMobile.style.backgroundSize = 'cover';

    console.log('Background image applied successfully');
  } catch (error) {
    console.error('Error setting background image:', error);
  }
}


function displayHeroDesktop(heroHTML) {
  heroDesktopSection.innerHTML = heroHTML


}


// END HERO ARTIST DESKTOP

// LIKED SECTION CONTAINER

function createLikedSectionContainer(artist, image) {
  return `<div class="row">
                  <div class="sectionTitle">Brani che ti piacciono</div>
                  <div class="col-lg-4 mt-3">
                    <div
                      class="circle-image"
                      style="
                        width: 50px;
                        height: 50px;
                        overflow: hidden;
                        border-radius: 50%;
                      "
                    >
                      <img
                        src="${image}"
                        alt="artistPhoto"
                        class="img-fluid"
                        style="width: 100%; height: auto; display: block"
                      />
                    </div>
                  </div>
                  <div class="col-lg-8 mt-3 p-0">
                    <p style="font-size: small; font-weight: bold">
                      Hai messo Mi piace a 11 brani
                    </p>
                    <p style="font-size: x-small">Di ${artist}</p>
                  </div>
                </div>`
}

function displayLikedSectionContainer(likedSectionHTML) {
  likedSectionContainerDesktop.innerHTML = likedSectionHTML
}

// END LIKED SECTION CONTAINER

// POPULAR TRACKS MOBILE


function createPopularTracksMobile(title, image, counter) {
  const listeners = generateRandomNumber()
  return `<div class="d-flex p-2">
              <div class="col-sm-1 p-3 d-flex align-items-center"><p>${counter}</p></div>
              <div class="col-sm-1" style="width: 80px; height: 80px">
                <img
                  src="${image}"
                  class="img-fluid songPopularImage"
                  alt="Immagine 1"
                />
              </div>
              <div class="col-sm-9 p-2">
                <h3 class="songName">${title}</h3>
                <p>${listeners}</p>
              </div>
              <div class="col-sm-1 ms-auto d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-three-dots-vertical"
                  onclick="toggleDropdownMenu(this)"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                  />
                </svg>
              </div>
            </div>`
}

function displayPopularTracksMobile(popularTracksMobileHTML) {
  tracksPopularMobile.innerHTML = popularTracksMobileHTML
}


// END POPULAR TRACKS MOBILE


// HERO MOBILE AND LISTENERS MOBILE

function createHeroMobileAndListeners(artist) {

  return `<h1>${artist}</h1>`
}

function displayHeroMobileAndListeners(dataHTML) {
  heroMobileArtist.innerHTML = dataHTML
}


function createListenersMobileNumber() {
  const listeners = generateRandomNumber()

  return listeners
}

function displayListenersMobileNumber(dataHTML) {
  listenersMobileNumber.innerHTML = dataHTML
}

// END HERO MOBILE AND LISTENERS MOBILE

// LIKED MOBILE


function createLikedMobile(image, artist) {

  return `<div id="likedIcon">
          <img
            class="liked-img"
            src="${image}"
            alt="${artist}"
            width="50"
          />

          <i
            class="heartIcon bi bi-heart-fill"
            width="10"
            height="10"
            fill="currentColor"
          ></i>
        </div>

        <div id="likedText">
          <h2 class="likedSong">Brani che ti piacciono</h2>
          <p class="likedNum">8 brani di ${artist}</p>
        </div>`
}


function displayLikedMobile(likedMobileHTML) {
  likedMobile.innerHTML = likedMobileHTML
}

// END LIKED MOBILE
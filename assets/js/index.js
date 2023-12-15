const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com/'
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '349d0315bamshe22fa1098ac0240p133261jsnab757b4a040e',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
}

const likedAlbums = ['122366', '7090505', '496520481', '244223', '9410100'];
const homePageTracks = ['92720102', '1141668', '1662139552'];
const suggeritiAlbums = ['297188862', '2732901', '103248', '108938', '1238967', '340077257'];
const mobileMusicaAlbums = ['297188862', '1238967', '103248', '108938', '1238967', '340077257'];
const mobilePodcastShowAlbums = ['2732901', '108938', '1238967', '340077257', '297188862', '103248'];
const playlistMobileAlbums = ['2732901', '108938', '1238967'];


const likedAlbumCards = document.querySelector('#likedCards');
const trackSliderItems = document.querySelector('#tracksSliderItems');
const suggeritiAlbumsContainer = document.querySelector('#suggeritiAlbums');
const mobileMusicaSuggeriti = document.querySelector('#mobileMusicaSuggeriti');
const mobilePodcastSuggeriti = document.querySelector('#mobilePodcastSuggeriti');
const playlistMobileAlbumsContainer = document.querySelector('#playlistMobileWrapper');


async function fetchHomepageData() {
  try {
    await getTracksForSlider();
    await getSuggeritiAlbums();
    await getLikedAlbumTracks();
    await getMobileMusicaSuggeriti();
    await getMobilePodcastSuggeriti();
    await getMobilePlaylistAlbums();
  } catch (error) {
    console.error(error);
  }
}

fetchHomepageData();

async function getAlbumTracks(id) {
  try {
    const data = await fetch(BASE_URL + `album/${id}`, options)
    const response = await data.json()

    return response
  } catch (e) {
    console.error(e);
  }
}


async function getLikedAlbumTracks() {
  try {
    let albumsHTML = '';

    for (let i = 0; i < likedAlbums.length; i++) {
      const albumId = likedAlbums[i];
      const albumTracks = await getAlbumTracks(albumId);
      const albumHTML = createLikedAlbumHTML(albumTracks);
      albumsHTML += albumHTML;
    }

    displayLikedAlbums(albumsHTML);
  } catch (e) {
    console.error(e);
  }
}

function createLikedAlbumHTML(albumTracks) {
  const { id, title, cover_big, artist } = albumTracks;
  return `
    <a href="/album.html?album=${id}" class="card-link">
      <div class="card">
        <img
          src="${cover_big}"
          class="card-img-top"
          alt="${title}"
        />
        <div class="card-body">
          <h5 class="card-title">${artist.name}</h5>
          <p class="card-text">${title}</p>
        </div>
      </div>
    </a>
  `;
}




function displayLikedAlbums(albumsHTML) {
  likedAlbumCards.innerHTML = albumsHTML;
}


async function getTrackFromID(trackID) {
  try {
    const data = await fetch(BASE_URL + 'track/' + trackID, options);
    const response = await data.json();

    return response;
  } catch (e) {
    console.error(e);

  }
}

let isFirstItem = true;

function createTracks(track) {
  const { title, artist, album } = track;
  const activeClass = isFirstItem ? 'active' : ''

  isFirstItem = false

  return `<div class="carousel-item ${activeClass} card mb-3 border-0 bg-black bg-gradient">
        <div class="row">
            <div class="col-md-3 p-4">
                <img src="${album.cover_big}" class="img-fluid" alt="copertina singolo"/>
            </div>
            <div class="col-md-6 pt-3">
                <div class="card-body text-light">
                    <h5 class="card-title">
                        <b class="fs-1">${title}</b>
                    </h5>
                    <p class="card-text">${artist.name}</p>
                    <p class="card-text">
                        Ascolta il nuovo singolo di ${artist.name}!
                    </p>
                    <button class="rounded-pill border-0 spotify-green-bg mx-2 py-2 px-4">
                        <b>Play</b>
                    </button>
                    <button class="rounded-pill border border-secondary bg-transparent text-white mx-2 py-2 px-4">
                        <b>Salva</b>
                    </button>
                    <button class="rounded-pill border-0 text-secondary bg-transparent">
                        <b>. . .</b>
                    </button>
                </div>
            </div>
            <div class="col-md-3">
                <button class="rounded border-0 text-secondary bg-black bg-gradient m-2 h-10 opacity-50">
                    <b>NASCONDI ANNUNCI</b>
                </button>
            </div>
        </div>
    </div>`;
}


function displayTracks(tracksHTML) {
  trackSliderItems.innerHTML = tracksHTML;
}

async function getTracksForSlider() {
  try {
    let tracksHTML = '';
    for (let i = 0; i < homePageTracks.length; i++) {
      const trackId = homePageTracks[i];
      const track = await getTrackFromID(trackId);
      if (track) {
        const trackHTML = createTracks(track);
        tracksHTML += trackHTML;
      }
    }
    displayTracks(tracksHTML);
  } catch (e) {
    console.error(e);
  }
}

async function getSuggeritiAlbums() {
  try {
    let albumsHTML = '';

    for (let i = 0; i < suggeritiAlbums.length; i++) {
      const albumId = suggeritiAlbums[i];
      const albumTracks = await getAlbumTracks(albumId);
      const albumHTML = createSuggeritiAlbums(albumTracks, albumId);
      albumsHTML += albumHTML;
    }
    displaySuggeritiAlbums(albumsHTML);
  }
  catch (e) {
    console.error(e);
  }
}

function createSuggeritiAlbums(albumTracks, albumId) {
  const { title, cover_big } = albumTracks

  return `<a href="/album.html?album=${albumId}" style="text-decoration: none">
                <div class="col">
                    <div class="card bg-dark border-0 text-white">
                      <div class="row g-0">
                        <div class="col-md-4">
                          <img
                            src="${cover_big}"
                            class="img-fluid rounded-start"
                            alt="Card Image"
                          />
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title text-truncate">
                              <b>${title}</b>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </a>`;
}

function displaySuggeritiAlbums(albumsHTML) {
  suggeritiAlbumsContainer.innerHTML = albumsHTML
}


async function getMobileMusicaSuggeriti() {
  try {
    let albumsHTML = '';

    for (let i = 0; i < mobileMusicaAlbums.length; i++) {
      const albumId = mobileMusicaAlbums[i];
      const albumTracks = await getAlbumTracks(albumId);
      const albumHTML = createMobileMusicaSuggeriti(albumTracks, albumId);
      albumsHTML += albumHTML;

    }
    displayMobileMusicaSuggeriti(albumsHTML);

  } catch (e) {
    console.error(e)
  }
}

async function getMobilePodcastSuggeriti() {
  try {
    let albumsHTML = '';

    for (let i = 0; i < mobilePodcastShowAlbums.length; i++) {
      const albumId = mobilePodcastShowAlbums[i];
      const albumTracks = await getAlbumTracks(albumId);
      const albumHTML = createMobilePodcastSuggeriti(albumTracks, albumId);
      albumsHTML += albumHTML;

    }
    displayMobilePodcastSuggeriti(albumsHTML);

  } catch (e) {
    console.error(e)
  }
}

function createMobileMusicaSuggeriti(albumTracks, albumId) {
  const { title, cover_big } = albumTracks

  return `<div class="col-6 mb-2">
            <a href = "/album.html?album=${albumId}" style = "text-decoration: none" >
                  <div class="card border-0 text-white" style="background: #242424;">
                    <div class="row g-0">
                      <div class="col-4">
                        <img
                          src="${cover_big}"
                          class="img-fluid rounded-start"
                          alt="{${title}"
                        
                        />
                      </div>
                      <div class="col-8">
                        <div class="col-md-4">
                          <div class="card-body pb-0 pt-2">
                            <h5 class="card-title">${title}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </a>
                </div>
                `;
}

function createMobilePodcastSuggeriti(albumTracks, albumId) {
  const { title, cover_big } = albumTracks

  return `<div class="col-6 mb-2">
            <a href = "/album.html?album=${albumId}" style = "text-decoration: none" >
                  <div class="card border-0 text-white" style="background: #242424;">
                    <div class="row g-0">
                      <div class="col-4">
                        <img
                          src="${cover_big}"
                          class="img-fluid rounded-start"
                          alt="{${title}"
                        
                        />
                      </div>
                      <div class="col-8">
                        <div class="col-md-4">
                          <div class="card-body pb-0 pt-2">
                            <h5 class="card-title">${title}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </a>
                </div>`;
}


function displayMobileMusicaSuggeriti(albumsHTML) {
  mobileMusicaSuggeriti.innerHTML = albumsHTML;
}

function displayMobilePodcastSuggeriti(albumsHTML) {
  mobilePodcastSuggeriti.innerHTML = albumsHTML
}


async function getMobilePlaylistAlbums() {
  try {
    let albumsHTML = '';

    for (let i = 0; i < playlistMobileAlbums.length; i++) {
      const albumId = playlistMobileAlbums[i];
      const albumTracks = await getAlbumTracks(albumId);
      const albumHTML = createMobilePlaylistAlbums(albumTracks, albumId);
      albumsHTML += albumHTML;

    }
    displayMobilePlaylistAlbums(albumsHTML);
  } catch (e) {
    console.error(e)
  }
}

function createMobilePlaylistAlbums(albumTracks, albumId) {
  const { title, cover_big } = albumTracks

  return `<div id="playlist-mobile" class="m-4 p-2 d-md-none">
   <a href = "/album.html?album=${albumId}" style="text-decoration: none; color: white" >
          <div class="d-flex mt-2 mx-2">
            <img
              src="${cover_big}"
              height="200px"
              alt="Image 19"
              class="me-3"
            />
            <div>
              <p class="text-secondary">Playlist</p>
              <h2>${title}</h2>
            </div>
          </div>
          <div class="d-flex justify-content-between mx-2 mt-4">
            <div class="d-flex">
              <i class="bi bi-heart-fill fs-1" style="color: #1db954"></i>
              <i class="bi bi-three-dots-vertical fs-1 px-3 text-secondary"></i>
            </div>
            <div class="d-flex align-items-center">
              <p class="mb-0 px-3 text-secondary">16 brani</p>
              <i class="bi bi-play-circle-fill fs-1"></i>
            </div>
          </div>
          </a>
        </div>`;
}

function displayMobilePlaylistAlbums(albumHTML) {
  playlistMobileAlbumsContainer.innerHTML = albumHTML
}




const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com/'
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '349d0315bamshe22fa1098ac0240p133261jsnab757b4a040e',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
}

const ID = '122366' // Test album ID
const artist = '50 cent' // Test artist



// 5 random albums

let likedAlbums = ['122366', '7090505', '496520481', '62646932', '9410100'] // 5 random albums for liked section in homepage
let homePageTracks = ['92720102', '1141668', '1662139552'] // 3 random tracks for homepage
let suggeritiAlbums = ['297188862', '2732901', '103248', '108938', '1238967', '340077257'] // 6 randoms albums for suggeriti section in homepage

const likedAlbumCards = document.querySelector('#likedCards') // homepage liked cards
const trackSliderItems = document.querySelector('#tracksSliderItems') // homepage slider
const suggeritiAlbumsContainer = document.querySelector('#suggeritiAlbums')


// getAlbumTracks(ID)
// getTracksFromSearch(artist)

// GET LIKED ALBUMS

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
            // console.log('Album tracks: ', albumTracks);
        }

        displayLikedAlbums(albumsHTML);
    } catch (e) {
        console.error(e);
    }
}

function createLikedAlbumHTML(albumTracks) {
    const { title, cover_big, artist } = albumTracks;
    return `<div class="card">
                  <img
                    src="${cover_big}"
                    class="card-img-top"
                    alt="${title}"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${artist.name}</h5>
                    <p class="card-text">${title}</p>
                  </div>
                </div>`;
}



function displayLikedAlbums(albumsHTML) {
    likedAlbumCards.innerHTML = albumsHTML;
}

getLikedAlbumTracks();

// END LIKED ALBUMS 


// GET TRACKS FOR THE HOMEPAGE

async function getTrackFromID(trackID) {
    try {
        const data = await fetch(BASE_URL + 'track/' + trackID, options);
        const response = await data.json();

        return response;
    } catch (e) {
        console.error(e);

    }
}

let isFirstItem = true; // Check if track is the first item 

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


getTracksForSlider(); // Activate this to start the api fetch

// END GET TRACKS FOR HOMEPAGE

async function getSuggeritiAlbums() {
    try {
        let albumsHTML = '';

        for (let i = 0; i < suggeritiAlbums.length; i++) {
            const albumId = suggeritiAlbums[i];
            const albumTracks = await getAlbumTracks(albumId);
            const albumHTML = createSuggeritiAlbums(albumTracks);
            albumsHTML += albumHTML;
        }
        displaySuggeritiAlbums(albumsHTML);
    }
    catch (e) {
        console.error(e);
    }
}


function createSuggeritiAlbums(albumTracks) {
    const { title, cover_big } = albumTracks

    return `<div class="col">
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
                  </div>`;
}

function displaySuggeritiAlbums(albumsHTML) {
    suggeritiAlbumsContainer.innerHTML = albumsHTML
}

getSuggeritiAlbums() // Activate this to start the API fetch

// END SUGGERITI ALBUMS


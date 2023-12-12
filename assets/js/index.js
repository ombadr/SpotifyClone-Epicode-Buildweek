
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

let likedAlbums = ['122366', '7090505', '496520481', '62646932', '9410100'] // 2 random albums for liked section in homepage

const likedAlbumCards = document.querySelector('#likedCards')


// getAlbumTracks(ID)
// getTracksFromSearch(artist)

async function getAlbumTracks(id) {
    try {
        const data = await fetch(BASE_URL + `album/${id}`, options)
        const response = await data.json()

        return response
    } catch (e) {
        console.error(e);
    }
}

async function getTracksFromSearch(artist) {
    try {
        const data = await fetch(BASE_URL + `search?q=${artist}`, options)
        const response = await data.json()
        console.log(response)
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
            console.log('Album tracks: ', albumTracks);
        }

        displayLikedAlbums(albumsHTML);
    } catch (e) {
        console.error(e);
    }
}

function createLikedAlbumHTML(albumTracks) {
    const { title, label, cover_big, artist } = albumTracks;
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

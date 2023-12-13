import { convertSecondsToMinSec, generateRandomNumber } from "./utils/utils.js"

const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com/'
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '349d0315bamshe22fa1098ac0240p133261jsnab757b4a040e',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
}

const popularTracks = document.getElementById('popularTracks')

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
        console.log(artist)
        console.log(trackListUrl)

        if (trackListUrl) {
            let tracksHTML = ''
            const trackList = await getTrackList(trackListUrl)
            console.log('List of tracks:', trackList)

            for (let i = 0; i < 10; i++) { // max 10 tracks
                console.log(trackList.data[i].title)
                let trackHTML = createPopularSongs(trackList.data[i], i + 1)
                tracksHTML += trackHTML
            }
            displayPopularSongs(tracksHTML)
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
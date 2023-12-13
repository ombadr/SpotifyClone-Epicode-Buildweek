import { convertSecondsToMinSec, generateRandomNumber } from "./utils/utils.js"

const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com/'
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '349d0315bamshe22fa1098ac0240p133261jsnab757b4a040e',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
}

const albumTracks = document.getElementById('albumTracks')

document.addEventListener('DOMContentLoaded', () => {
    fetchSongs()
})

async function fetchSongs() {
    try {
        const urlString = window.location.href;
        const url = new URL(urlString);
        let albumFromUrl = url.searchParams.get('album')

        console.log(albumFromUrl)

        const albumResults = await getTracksFromAlbum(albumFromUrl)


        const artist = albumResults.artist.name
        const trackList = albumResults.tracklist
        console.log(artist)

        if (albumResults) {
            let tracksHTML = ''
            // const trackList = await getTrackList(trackListUrl)
            // console.log('List of tracks:', trackList)

            console.log(albumResults)
            for (let i = 0; i < 10; i++) { // max 10 tracks
                // const trackHTML = createAlbumSongs(trackList)
                console.log(albumResults.tracks.data[i].title) // title
                console.log(albumResults.tracks.data[i].duration) // duration
                const title = albumResults.tracks.data[i].title
                const duration = albumResults.tracks.data[i].duration
                const trackHTML = createAlbumSongs(artist, title, duration, i + 1)
                tracksHTML += trackHTML
            }
            displayAlbumSongs(tracksHTML)

        }

    } catch (e) {
        console.error(e)
    }
}

async function getTracksFromAlbum(album) {
    try {
        const data = await fetch(BASE_URL + `album/${album}`, options)
        const response = await data.json()
        return response
    } catch (e) {
        console.error(e)
    }
}



function createAlbumSongs(artist, title, duration, counter) {

    const randomNumber = generateRandomNumber()
    const convertedDuration = convertSecondsToMinSec(duration)

    return `<div class="row">
                    <div class="col-lg-1">${counter}</div>
                    <div class="col-lg-5 flex-grow-1">
                      <p>
                        ${title}<br /><span
                          >${artist}</span
                        >
                      </p>
                    </div>
                    <div class="col-lg-3 track">${randomNumber}</div>
                    <div class="col-lg-3">${convertedDuration}</div>
                  </div>`

}

function displayAlbumSongs(albumsHTML) {
    albumTracks.innerHTML = albumsHTML
}

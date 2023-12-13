import { convertSecondsToMinSec, generateRandomNumber, formatTime } from "./utils/utils.js"

const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com/'
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '349d0315bamshe22fa1098ac0240p133261jsnab757b4a040e',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
}

const albumTracks = document.getElementById('albumTracks')
const heroAlbum = document.getElementById('heroAlbum')

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
    console.log(albumResults)
    console.log(artist)


    if (albumResults) {

      let tracksHTML = ''
      let heroAlbumHTML = ''

      // const trackList = await getTrackList(trackListUrl)
      // console.log('List of tracks:', trackList)

      const imageAlbum = albumResults.cover_big
      const albumTitle = albumResults.title
      const albumArtist = albumResults.artist.name
      const releaseDate = albumResults.release_date
      const artistImage = albumResults.artist.picture_small
      const numberOfTracks = albumResults.nb_tracks
      const albumDuration = albumResults.duration
      const formattedDuration = formatTime(albumDuration)

      const heroHTML = createHeroAlbum(imageAlbum, albumTitle, albumArtist, releaseDate, artistImage, numberOfTracks, formattedDuration)


      displayHeroAlbum(heroHTML)


      console.log(releaseDate)


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

// HERO ALBUM
// TODO: finish render hero album


function createHeroAlbum(image, title, artist, releaseDate, artistImage, numberOfTracks, duration) {

  // duration format 53 min , 20 sec.
  return ` <div class="col-md-4 p-4 mx-0">
                    <img
                      src="${image}"
                      class="img-fluid border-0 sfumaAlbum"
                      alt="copertina alb"
                    />
                  </div>
                  <div class="col-md-8 pt-5 p-0">
                    <div class="card-body text-light p-1">
                      <p><b>Album</b></p>
                      <h5 class="card-title mb-5 p-3 display-1">
                        <b>${title}</b>
                      </h5>
                      <p class="card-text mt-5 p-1">
                        <img
                          src="${artistImage}"
                          alt="foto artisti"
                          class="rounded"
                          width="20"
                          height="20"
                        /><b>${artist} - ${releaseDate} - ${numberOfTracks} brani,</b
                        ><b class="text-light">${duration}</b>
                      </p>
                    </div>
                  </div>`
}


function displayHeroAlbum(heroAlbumHTML) {
  heroAlbum.innerHTML = heroAlbumHTML
}

// END HERO ALBUM



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


// getAlbumTracks(ID)
// getTracksFromSearch(artist)

async function getAlbumTracks(id) {
    try {
        const data = await fetch(BASE_URL + `album/${id}`, options)
        const response = await data.json()
        console.log(response.tracks.data)
        return response.tracks.data
    } catch (e) {
        console.error(e);
    }
}

async function getTracksFromSearch(artist) {
    try {
        const data = await fetch(BASE_URL + `search?q=${artist}`, options)
        const response = await data.json()
        console.log(response.data)
        return response.data
    } catch (e) {
        console.error(e);
    }
}


const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com/'
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '349d0315bamshe22fa1098ac0240p133261jsnab757b4a040e',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
}

const searchForm = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const searchTerm = searchInput.value.trim()

    if (searchTerm !== '') {
        try {
            const searchResults = await getTracksFromSearch(searchTerm)
            const artistId = searchResults.data[0].artist.id
            window.location.href = `artist.html?artist=${encodeURIComponent(artistId)}`
        } catch (e) {
            console.error(e)
        }
    }
})


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


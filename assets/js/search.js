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

    /*
    if (searchTerm !== '') {
        window.location.href = `artist.html?search=${encodeURIComponent(searchTerm)}`
    }
    */

    /*
        if (searchTerm !== '') {
            try {
                const searchResults = await getTracksFromSearch(searchTerm)
                const artist = searchResults.data[0].artist.name
                const trackListUrl = searchResults.data[0].artist.tracklist
                console.log(artist)
                console.log(trackListUrl)
    
                if (trackListUrl) {
                    const trackList = await getTrackList(trackListUrl)
                    console.log('List of tracks:', trackList)
    
                    for (let i = 0; i < 10; i++) {
                        console.log(trackList.data[i].title)
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }
    
        */

    if (searchTerm !== '') {
        try {
            const searchResults = await getTracksFromSearch(searchTerm)
            const artist = searchResults.data[0].artist.name
            window.location.href = `artist.html?artist=${encodeURIComponent(artist)}`
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


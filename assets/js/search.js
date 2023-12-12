// SEARCH
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

// END SEARCH
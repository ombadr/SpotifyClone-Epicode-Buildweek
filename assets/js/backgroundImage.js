// APPLY BACKGROUND IMAGE
const heroArtist = document.getElementById('hero-artist')

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        applyBackgroundImageClass('https://wallpapercave.com/wp/wp2089896.jpg')
    }, 3000)
})

function applyBackgroundImageClass(imageUrl) {
    try {
        console.log('Applying background image:', imageUrl);
        heroArtist.style.backgroundImage = `url('${imageUrl}')`;
        heroArtist.style.backgroundSize = 'cover';
        heroArtist.style.height = '400px'; // Example height, adjust as needed
        heroArtist.style.width = '100%'; // Adjust width as needed
        console.log('Background image applied successfully');
    } catch (error) {
        console.error('Error setting background image:', error);
    }
}



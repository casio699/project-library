// AnimeMedia Constructor
function AnimeMedia(title, type, genre, seasons, episodes, watched, completed) {
    this.title = title;
    this.type = type;
    this.genre = genre;
    this.seasons = seasons;
    this.episodes = episodes;
    this.watched = watched;
    this.completed = completed;
}

//Array for Storing AnimeMedia
const animeLibrary = [
    new AnimeMedia("Attack on Titan", "Series", "Action", 4, 75, 75,true),
    new AnimeMedia("Your Name", "Movie", "Romance", 1, 1,  0, false)
];

// Function to handle genre selection
function handleGenreSelection() {
    const genreSelect = document.getElementById('genre');
    const otherGenreInput = document.getElementById('other-genre');

    // Show the input field for other genre if "Other" is selected
    otherGenreInput.style.display = genreSelect.value === 'Other' ? 'block' : 'none';
}
// Function to handle seasons selection
function handleSeasonsSelection() {
    const seasonsSelect = document.getElementById('seasons');
    const otherSeasonsInput = document.getElementById('other-seasons');

    // Show the input field for other season if "Other" is selected
    otherSeasonsInput.style.display = seasonsSelect.value === 'Other' ? 'block' : 'none';
}

// Function to add new anime media
function addAnimeMedia() {
    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const genreSelect = document.getElementById('genre');
    const genre = genreSelect.value === 'Other' ? document.getElementById('other-genre').value : genreSelect.value;
    const seasonsSelectElement = document.getElementById('seasons');
const seasonsSelect = seasonsSelectElement.value;
let seasons;

if (seasonsSelect === 'Other') {
    const otherSeasonsInput = document.getElementById('other-seasons').value;
    seasons = otherSeasonsInput !== '' ? parseInt(otherSeasonsInput) : 0; // Handle empty input or non-numeric values
} else {
    seasons = parseInt(seasonsSelect);
}
    
    const episodes = parseInt(document.getElementById('episodes').value);
    const watched = parseInt(document.getElementById('watched').value);
    const completed = document.getElementById('completed').checked;
    
    

    // Validate that the watched value is a valid episode number
    if (!isNaN(watched) && watched >= 0 && watched <= episodes) {
        const newAnime = new AnimeMedia(title, type, genre, seasons, episodes, watched, completed);
        animeLibrary.push(newAnime);

        displayAnimeMedia();

        resetAndHide();
    } else {
        alert('Invalid episode number. Please enter a valid episode number.');
    }
}
//reset and hide the add new form
const resetAndHide= function(){
    document.getElementById('anime-form').reset();
    document.getElementById('form-container').style.display = 'none';
}
// Function to display anime media
function displayAnimeMedia() {
    const mediaListContainer = document.getElementById('media-list');
    mediaListContainer.innerHTML = '';

    animeLibrary.forEach(anime => {
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card');

        animeDiv.innerHTML = `
            <h2>${anime.title}</h2>
            <p>Type: ${anime.type}</p>
            <p>Genre: ${anime.genre}</p>
            <p>Seasons: ${anime.seasons}</p>
            <p>Episodes: ${anime.episodes}</p>
            <p>Last Watched Episode: ${anime.watched}</p>
            <p>completed: ${anime.completed}</p>
            <button onclick="removeAnime(${animeLibrary.indexOf(anime)})">Remove</button>
            <button onclick="toggleWatched(${animeLibrary.indexOf(anime)})">Update Last Watched Episode</button>
            <button onclick="toggleCompleted(${animeLibrary.indexOf(anime)})">Toggle Completed</button>
        `;

        mediaListContainer.appendChild(animeDiv);
    });
}
// function to remove anime from list
 function removeAnime (index){
    
        animeLibrary.splice(index, 1);
        displayAnimeMedia();  
}
    

// Function to update watched episode
function toggleWatched(index) {
    const episode = parseInt(prompt(`Enter the last watched episode for ${animeLibrary[index].title}:`), 10);
    
    if (!isNaN(episode) && episode >= 0 && episode <= animeLibrary[index].episodes) {
        animeLibrary[index].updateWatched(episode);
        displayAnimeMedia();
    } else {
        alert('Invalid episode number. Please enter a valid episode number.');
    }
    
};
//prototype function to change last watched episode display
AnimeMedia.prototype.updateWatched = function (episode) {
    this.watched = episode;
}
//function to toggle completed status
function toggleCompleted(index){
    animeLibrary[index].toggleCompleted();
    displayAnimeMedia();
}
// Prototype function to toggle watched status
AnimeMedia.prototype.toggleCompleted = function () {
    this.completed = !this.completed;
};

// Function to show the form container
function showForm() {
    document.getElementById('form-container').style.display = 'block';
}

// Call the displayAnimeMedia function after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    displayAnimeMedia();
});

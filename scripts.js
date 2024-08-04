const apiKey = '9a7a0e8dd1aa7e25c82440c0821ebe51';

// Fetch and display latest 3 movies
async function fetchLatestMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    const latestMovies = data.results.slice(0, 3);
    const latestMoviesContainer = document.getElementById('latest-movies');
    latestMoviesContainer.innerHTML = '';
    latestMovies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-details">
                <h3>${movie.title}</h3>
                <p>${movie.release_date}</p>
            </div>
        `;
        latestMoviesContainer.appendChild(movieItem);
    });
}

// Search for movies, TV shows, and people
document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`);
    const data = await response.json();
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';
    data.results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name}">
            <div class="result-details">
                <h3>${item.title || item.name}</h3>
                <p>${item.release_date || item.first_air_date}</p>
            </div>
        `;
        searchResultsContainer.appendChild(resultItem);
    });
});

// Fetch and display movies by category
async function fetchMovies(category) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    const moviesResultsContainer = document.getElementById('movies-results');
    moviesResultsContainer.innerHTML = '';
    data.results.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-details">
                <h3>${movie.title}</h3>
                <p>${movie.release_date}</p>
            </div>
        `;
        moviesResultsContainer.appendChild(movieItem);
    });
}

// Fetch and display TV shows by category
async function fetchTVShows(category) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${category}?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    const tvResultsContainer = document.getElementById('tv-results');
    tvResultsContainer.innerHTML = '';
    data.results.forEach(tvShow => {
        const tvItem = document.createElement('div');
        tvItem.classList.add('tv-item');
        tvItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}" alt="${tvShow.name}">
            <div class="tv-details">
                <h3>${tvShow.name}</h3>
                <p>${tvShow.first_air_date}</p>
            </div>
        `;
        tvResultsContainer.appendChild(tvItem);
    });
}

// Event listeners for movie buttons
document.getElementById('now-playing-button').addEventListener('click', () => fetchMovies('now_playing'));
document.getElementById('popular-movies-button').addEventListener('click', () => fetchMovies('popular'));
document.getElementById('top-rated-movies-button').addEventListener('click', () => fetchMovies('top_rated'));
document.getElementById('upcoming-movies-button').addEventListener('click', () => fetchMovies('upcoming'));

// Event listeners for TV show buttons
document.getElementById('airing-today-button').addEventListener('click', () => fetchTVShows('airing_today'));
document.getElementById('on-the-air-button').addEventListener('click', () => fetchTVShows('on_the_air'));
document.getElementById('popular-tv-button').addEventListener('click', () => fetchTVShows('popular'));
document.getElementById('top-rated-tv-button').addEventListener('click', () => fetchTVShows('top_rated'));

// Initial fetch of latest movies
fetchLatestMovies();

import moviesData from '@/data/data.json'

export function  getAllData()
{
    return moviesData;
}

export function getAllMovies()
{
    const allData = getAllData();
    return allData['movies'];
}

export function getMovieById(id)
{
    const allMovies = getAllMovies();
    const movieId = allMovies.find(a => a.id === id);
    return movieId;
}

export function getAllGenres()
{
    const allData = getAllData();
    return allData['genres'];
}

export function  getGenreById(id)
{
    const allGenre = getAllGenres();
    const genreId = allGenre.find(a => a.id === id);
    return genreId;
}

export function getAllDirectors()
{
    const allData = getAllData();
    return allData['directors'];
}

export function getDirectorById(id)
{
    const allDirectors = getAllDirectors();
    const directorId = allDirectors.find(a => a.id === id);
    return directorId;
}

export function getMoviesCountByDirector()
{
    const allMovies = getAllMovies();
    const directorMovieCount = {};

    allMovies.forEach(movie => {
        const directorId = movie.directorId;
        
        // If the director already has a count, increment it, otherwise initialize to 1
        if (directorMovieCount[directorId]) {
        directorMovieCount[directorId]++;
        } else {
        directorMovieCount[directorId] = 1;
        }
    });

    return directorMovieCount;
}
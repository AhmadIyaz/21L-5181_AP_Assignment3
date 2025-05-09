import { getAllDirectors, getMoviesCountByDirector } from '@/lib/movie_data';

export default function handler(req, res) {
  const directors = getAllDirectors();
  const movieCountByDirector = getMoviesCountByDirector();

  const data = directors.map((director) => ({
    ...director,
    movieCount: movieCountByDirector[director.id] || 0,
  }));

  res.status(200).json(data);
}

import { useRouter } from 'next/router';
import { getAllMovies, getMovieById, getDirectorById } from '@/lib/movie_data';

export async function getStaticProps({ params }) {
  const movieId = params.id;
  const movie = await getMovieById(movieId);
  const director = await getDirectorById(movie.directorId);

  return {
    props: {
      director,
    },
  };
}

export async function getStaticPaths() {
  const movies = getAllMovies();
  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default function DirectorPage({ director }) {
  if (!director) {
    return <div>Director information not available.</div>;
  }

  return (
    <div>
      <h1>Director: {director.name}</h1>
      <p>{director.biography}</p>
    </div>
  );
}

import { getAllGenres, getGenreById } from '@/models/Genre';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import MovieCard from '@/components/MovieCard';

export async function getStaticPaths() {
  const genres = await getAllGenres();
  const paths = genres.map((genre) => ({
    params: { id: genre.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const genre = await getGenreById(params.id);

  if (!genre) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genre,
      movies: genre.movies,
    },
    revalidate: 60, // Revalidate every minute
  };
}

export default function GenrePage({ genre, movies }) {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {genre.name}
          </Typography>
          {genre.description && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
              {genre.description}
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Movies in this Genre
          </Typography>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid key={movie.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {movies.length === 0 && (
          <Typography variant="body1" color="text.secondary" align="center">
            No movies found in this genre.
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

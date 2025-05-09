import { getDirectorById } from '@/models/Director';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import MovieCard from '@/components/MovieCard';

export async function getStaticPaths() {
  const directors = await getAllDirectors();
  const paths = directors.map((director) => ({
    params: { id: director.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const director = await getDirectorById(params.id);

  if (!director) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      director,
      movies: director.movies,
    },
    revalidate: 60, // Revalidate every minute
  };
}

export default function DirectorPage({ director, movies }) {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {director.name}
          </Typography>
          {director.biography && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
              {director.biography}
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Movies Directed
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
            No movies found for this director.
          </Typography>
        )}
      </Paper>
    </Container>
  );
} 
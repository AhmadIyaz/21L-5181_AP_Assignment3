import { getAllMovies } from '@/models/Movie';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Rating
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export async function getStaticProps() {
  const movies = await getAllMovies();
  const trendingMovies = movies
    .filter(movie => movie.rating >= 8.5)
    .slice(0, 6);

  return {
    props: {
      trendingMovies,
    },
    revalidate: 60, // Revalidate every minute
  };
}

export default function HomePage({ trendingMovies }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welcome to Movie House
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center" paragraph>
          Explore our collection of movies, directors, and genres
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Trending Movies
        </Typography>
        <Grid container spacing={3}>
          {trendingMovies.map((movie) => (
            <Grid key={movie.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom noWrap>
                  {movie.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating
                    value={movie.rating / 2}
                    precision={0.5}
                    readOnly
                    size="small"
                    icon={<StarIcon fontSize="inherit" />}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {movie.rating.toFixed(1)}/10
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {movie.releaseYear}
                </Typography>
                <Button
                  component={Link}
                  href={`/movies/${movie.id}`}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

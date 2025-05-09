import { getAllMovies, getMovieById, getDirectorById } from "@/lib/movie_data";
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Rating,
  Chip,
  Divider
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import { getMovieById as getMovieByIdFromModel } from '@/models/Movie';

export async function getStaticPaths() {
  const movies = await getAllMovies();

  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", 
  };
}

export async function getStaticProps({ params }) {
  const movie = await getMovieByIdFromModel(params.id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
    revalidate: 60, // Revalidate every minute
  };
}

export default function MoviePage({ movie }) {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h3" component="h1" gutterBottom>
              {movie.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating
                value={movie.rating / 2}
                precision={0.5}
                readOnly
                icon={<StarIcon fontSize="inherit" />}
              />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {movie.rating.toFixed(1)}/10
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ mr: 1 }} />
                Release Year
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {movie.releaseYear}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} />
                Director
              </Typography>
              <Button
                component={Link}
                href={`/directors/${movie.director.id}`}
                variant="contained"
                startIcon={<MovieIcon />}
                sx={{ mt: 1 }}
              >
                {movie.director.name}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {movie.description}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Genre
              </Typography>
              <Chip
                label={movie.genre.name}
                component={Link}
                href={`/genres/${movie.genre.id}`}
                clickable
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

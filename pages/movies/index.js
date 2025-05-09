import { useState } from 'react';
import { getAllMovies, getAllGenres } from '@/lib/movie_data';
import MovieCard from '@/components/MovieCard';
import { 
  Container, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid,
  Box
} from '@mui/material';

export async function getStaticProps() {
  const movies = await getAllMovies();
  const genres = await getAllGenres();

  return {
    props: {
      movies,
      genres,
    },
    revalidate: 10,
  };
}

export default function MoviesPage({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies =
    selectedGenre === 'all'
      ? movies
      : movies.filter((movie) => movie.genreId === selectedGenre);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          🎬 Movie House
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, 
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h6" component="label">
          Filter by Genre:
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="genre-select-label">Genre</InputLabel>
          <Select
            labelId="genre-select-label"
            value={selectedGenre}
            label="Genre"
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

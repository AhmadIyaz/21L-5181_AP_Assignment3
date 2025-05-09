import { getAllGenres } from '@/models/Genre';
import { Container, Typography, Grid } from '@mui/material';
import GenreCard from '@/components/GenreCard';

export async function getStaticProps() {
  const genres = await getAllGenres();
  return {
    props: {
      genres,
    },
    revalidate: 60, // Revalidate every minute
  };
}

export default function Genres({ genres }) {
  return (
    <Container>
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ my: 4 }}>
        Movie Genres
      </Typography>
      
      <Grid container spacing={3}>
        {genres.map((genre) => (
          <Grid key={genre.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
            <GenreCard genre={genre} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

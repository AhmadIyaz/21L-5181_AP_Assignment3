import { getAllDirectors } from '@/models/Director';
import { Container, Typography, Grid } from '@mui/material';
import DirectorCard from '@/components/DirectorCard';

export async function getStaticProps() {
  const directors = await getAllDirectors();
  return {
    props: {
      directors,
    },
    revalidate: 60, // Revalidate every minute
  };
}

export default function Directors({ directors }) {
  return (
    <Container>
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ my: 4 }}>
        Movie Directors
      </Typography>
      
      <Grid container spacing={3}>
        {directors.map((director) => (
          <Grid key={director.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
            <DirectorCard director={director} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

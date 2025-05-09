import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import Link from 'next/link';

export default function MovieCard({ movie }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea component={Link} href={`/movies/${movie.id}`}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.year}
          </Typography>
          {movie.director && (
            <Typography variant="body2" color="text.secondary">
              Director: {movie.director}
            </Typography>
          )}
          {movie.rating && (
            <Typography variant="body2" color="text.secondary">
              Rating: {movie.rating.toFixed(1)}/10
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
} 
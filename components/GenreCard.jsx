import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import Link from 'next/link';

export default function GenreCard({ genre }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea component={Link} href={`/genres/${genre.id}`}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {genre.name}
          </Typography>
          {genre.description && (
            <Typography variant="body2" color="text.secondary" sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              {genre.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
} 
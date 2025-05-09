import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import Link from 'next/link';

export default function DirectorCard({ director }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea component={Link} href={`/directors/${director.id}`}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {director.name}
          </Typography>
          {director.birthYear && (
            <Typography variant="body2" color="text.secondary">
              Born: {director.birthYear}
            </Typography>
          )}
          {director.biography && (
            <Typography variant="body2" color="text.secondary" sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              {director.biography}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
} 
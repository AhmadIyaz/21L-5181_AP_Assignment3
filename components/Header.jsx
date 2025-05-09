import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContexts';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MovieIcon from '@mui/icons-material/Movie';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            flexGrow: 1
          }}
        >
          🎬 Movie House
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            component={Link}
            href="/movies"
            color="inherit"
            startIcon={<MovieIcon />}
          >
            Movies
          </Button>
          <Button
            component={Link}
            href="/directors"
            color="inherit"
            startIcon={<PersonIcon />}
          >
            Directors
          </Button>
          <Button
            component={Link}
            href="/genres"
            color="inherit"
            startIcon={<CategoryIcon />}
          >
            Genres
          </Button>
          <Button
            component={Link}
            href="/help"
            color="inherit"
            startIcon={<HelpIcon />}
          >
            Help
          </Button>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 
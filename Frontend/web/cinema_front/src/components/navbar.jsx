import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';

const ButtonAppBar = () => {
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUserName(user.nom); 
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: '#8D021F' }}>
        <Toolbar>
          <MovieIcon sx={{ color: '#ff0000', fontSize: 28, marginRight: 1 }} />
          <Typography variant="h6" color={'white'} component={Link} to="/client/Movies" sx={{ flexGrow: 1 }}>
            MyCine
          </Typography>
          <Button style={{ color: 'white' }} href="/profile">{userName}</Button>
          <Button onClick={handleLogout} style={{ color: 'white' }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default ButtonAppBar;
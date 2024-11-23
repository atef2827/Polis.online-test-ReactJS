
import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from 'hooks/useAuth';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isAuthenticated, logout } = useAuth();

  // Handle menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
        <Toolbar sx={{ backgroundColor: '#fff', color: "#000" }}>
        <img src="/assets/images/logo.svg" alt="polis.online" width={228} height={64} />
        <div style={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {
            isAuthenticated?
            <>
              <Button onClick={logout}>Logout</Button>
              <Button color="inherit" component={Link} to="/my-account">My Account</Button>
            </>
            :
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/">Signup</Button>
            </>
          }
        </Box>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Dropdown menu */}
          {
            isAuthenticated?
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/my-account">My Account</MenuItem>
              </Menu>
            :
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/">Signup</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/login">Login</MenuItem>
              </Menu>
          }
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
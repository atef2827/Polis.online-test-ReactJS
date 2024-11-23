
import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <div className="desktop-menu" sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/">Signup</Button>
        </div>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component="a" href="/">Signup</MenuItem>
          <MenuItem onClick={handleMenuClose} component="a" href="/login">Login</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = ({ currentUser, signOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between items-center mb-12">
      <div>
        <h1 className="text-2xl text-gray-800">Hi {currentUser.displayName || 'User'},</h1>
        <h2 className="text-4xl font-bold text-gray-900">Welcome Here</h2>
      </div>
      <div>
        {currentUser.photoURL ? (
          <Avatar
            alt="Profile Picture"
            src={currentUser.photoURL}
            style={{ width: '64px', height: '64px' }}
            onMouseEnter={handleMenuOpen}
          />
        ) : (
          <Avatar
            style={{ width: '64px', height: '64px' }}
            onMouseEnter={handleMenuOpen}
          >
            <AccountCircle style={{ width: '100%', height: '100%' }} />
          </Avatar>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={signOut}>Sign Out</MenuItem>
        </Menu>
      </div>
    </div>
  );
};



export default Header;

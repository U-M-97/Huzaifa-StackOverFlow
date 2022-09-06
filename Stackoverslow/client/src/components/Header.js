import React, { useEffect } from 'react';
import { Avatar } from '@mui/material';
import './css/header.css';
import { auth } from '../firebase';

import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Link } from 'react-router-dom';

function Header() {
  const user = useSelector(selectUser);
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <div className="header-left">
            <img
              src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg"
              alt=""
            />
            <h3>Products</h3>
          </div>
        </Link>
        <div className="header-middle">
          <div className="header-search-container">
            <SearchIcon className="searchicon" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="header-right">
          <div className="header-right-container">
            <span
              onClick={() => {
                auth.signOut();
              }}
            >
              <Avatar src={user?.photo} />
            </span>
            <InboxIcon />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

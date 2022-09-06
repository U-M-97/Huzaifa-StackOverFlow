import React from 'react';
import './css/sidebar.css';
import PublicIcon from '@mui/icons-material/Public';
import { Link } from 'react-router-dom';
import './css/sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <Link to="/">Home</Link>
          </div>
          <div className="sidebar-option">
            <Link to="">PUBLIC</Link>

            <div className="link">
              <div className="link-tag">
                <PublicIcon />
                <Link to="">Question</Link>
              </div>
              <div className="tags">
                <p>Tags</p>
                <p>Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

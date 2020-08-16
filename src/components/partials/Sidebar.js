import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <Link to='/find'>
          <div className="sidebar-item">
            <span className="sidebar-item-title">Find leagues</span> 
          </div>
        </Link>
      </div>
    </div>
  );
}

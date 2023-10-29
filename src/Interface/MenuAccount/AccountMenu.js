import React from 'react';
import './AccountMenu.css'; // make sure to import the CSS file

function AccountMenu() {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="profile">
          <div className="avatar"></div>
          <div>Welcome, Pierre Chevin</div>
        </div>

        <div className="menu-item">Notifications</div>
        <div className="menu-item">Change password</div>
        <div className="menu-item">Detail account</div>
        <div className="menu-item">Change preference</div>
        <div className="menu-item">Become a partner</div>
        <div className="menu-item">Sign out</div>
      </div>
    </div>
  );
}

export default AccountMenu;

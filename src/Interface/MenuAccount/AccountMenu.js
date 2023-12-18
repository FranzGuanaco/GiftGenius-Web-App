import React from 'react';
import './AccountMenu.css'; // make sure to import the CSS file
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

function AccountMenu() {

  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      // Déconnexion réussie, vous pouvez rediriger l'utilisateur ou mettre à jour l'état de l'interface utilisateur
      navigate('/')
      console.log('User signed out successfully');
    }).catch((error) => {
      // Une erreur s'est produite lors de la tentative de déconnexion
      console.error('Sign out error', error);
    });
  };

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
        <div className="menu-item" onClick={handleSignOut}>Sign out</div>
      </div>
    </div>
  );
}

export default AccountMenu;

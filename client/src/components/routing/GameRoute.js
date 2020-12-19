import React from 'react';
import { Route } from 'react-router-dom';

// CSS
import '../../styles/game.css';

// Images
import logo from '../../images/logo.png';

const GameRoute = ({ component: Component, ...rest }) => (
  <main className='game-container'>
    <img src={logo} className='logo' alt='Twitch Bingo by TenMatous' />
    <Route {...rest} render={(props) => <Component {...props} />} />
  </main>
);

export default GameRoute;

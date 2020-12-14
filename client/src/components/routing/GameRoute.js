import React from 'react';
import { Route } from 'react-router-dom';

// CSS
import '../../styles/game.css';

const GameRoute = ({ component: Component, ...rest }) => (
  <main className='game-container'>
    <Route {...rest} render={(props) => <Component {...props} />} />
  </main>
);

export default GameRoute;
